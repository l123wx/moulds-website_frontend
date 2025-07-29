import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const isFunction = (v: unknown): v is Function => typeof v === 'function'

interface Options {
    withSuccessMsg?: boolean
    withErrorMsg?: boolean
    successMsg?: string
    errorMsg?: string | ((err: Error) => any)
    catchable?: boolean
}

export const useLoading = (initValOrOptions: boolean | Options = false, _options: Options = {}) => {
    let _loading = false
    if (typeof initValOrOptions === 'object') {
        _options = { ...initValOrOptions, ..._options }
    } else {
        _loading = initValOrOptions
    }

    const isLoading = ref(_loading)

    const run = <T>(promise: Promise<T>, options: Options = {}): Promise<T> => {
        const {
            withSuccessMsg = false,
            withErrorMsg = false,
            successMsg = 'Success',
            errorMsg,
            catchable = false
        } = { ..._options, ...options }
        if (!promise) {
            // eslint-disable-next-line no-console
            if (catchable) {
                console.warn('useLoading error: params is not a promise')
                return Promise.resolve() as any
            } else {
                console.error('useLoading error: params is not a promise')
                return Promise.reject(new Error('Unknown error'))
            }
        }

        isLoading.value = true
        // @ts-ignore
        promise = promise
            .then(val => {
                isLoading.value = false
                if (withSuccessMsg && successMsg) {
                    ElMessage.success(successMsg)
                }
                return val
            })
            .catch(e => {
                isLoading.value = false
                if (withErrorMsg) {
                    if (isFunction(errorMsg)) {
                        ElMessage.error(errorMsg(e))
                    } else {
                        ElMessage.error(errorMsg || e.message)
                    }
                }
                if (!options.catchable) {
                    throw e
                }
                console.error('(catchable)useLoading error: ', e)
            })
        return promise
    }

    return {
        isLoading,
        run
    }
}
