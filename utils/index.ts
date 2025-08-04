/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export const handconstree = <T extends Record<string, any>>(
    data: T[],
    id?: string,
    parentId?: string,
    children?: string,
    transform: (data: T, parentData: T | null, isLeaf: boolean) => T = (data, _pData, _isLeaf) => data
) => {
    const config = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children'
    }

    const childrenListMap: Record<string, T[]> = {}
    const nodeIds: Record<string, T> = {}
    const tree = []

    for (const d of data) {
        const parentId = d[config.parentId]
        if (!childrenListMap[parentId]) {
            childrenListMap[parentId] = []
        }
        nodeIds[d[config.id]] = d
        childrenListMap[parentId].push(d)
    }

    for (const d of data) {
        const parentId = d[config.parentId]
        if (!nodeIds[parentId]) {
            tree.push(transform(d, null, !childrenListMap[d[config.id]] || childrenListMap[d[config.id]].length === 0))
        }
    }

    const adaptToChildrenList = (o: any) => {
        if (childrenListMap[o[config.id]]) {
            o[config.childrenList] = childrenListMap[o[config.id]].map(c => transform(c, o, !childrenListMap[c[config.id]] || childrenListMap[c[config.id]].length === 0))
        }
        if (o[config.childrenList]) {
            for (const c of o[config.childrenList]) {
                adaptToChildrenList(c)
            }
        }
    }

    for (const t of tree) {
        adaptToChildrenList(t)
    }
    return tree
}
