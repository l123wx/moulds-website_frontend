import http from '..'

export type DataStatistics = {
    label: string
    value: number
    suffix: string
}

const getDataStatistics = (languageCode: string) => {
    return http<{ data: DataStatistics[] }>('/dataStatistics', {
        method: 'GET',
        params: {
            languageCode
        }
    })
}

export default getDataStatistics
