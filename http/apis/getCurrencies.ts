import http from '..'

export type Currency = {
    /** 货币ID */
    id: number;

    /** 标签 */
    label: string;

    /** 键 */
    key: string;

    /** 汇率 */
    exchangeRate: number;
}

const getCurrencies = () => {
    return http<{ data: Currency[] }>('/currencies', {
        method: 'GET'
    })
}

export default getCurrencies
