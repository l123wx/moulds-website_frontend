<template>
    <div id="download-page" class="download-container">
        <div class="e-container">
            <div class="header-container">
                <h1 class="title">{{ title }}</h1>
            </div>
            <div class="download-content">
                <el-table v-loading="pending" :data="downloadFiles" style="width: 100%">
                    <el-table-column width="30">
                        <template #default="scope">
                            <el-checkbox style="height: 50px" :model-value="selectedFileIds.includes(scope.row.id)" @change="(val) => handleCheckboxChange(Boolean(val), scope.row.id)" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="t('File Name')" />
                    <el-table-column prop="fileSize" :label="t('File Size')" width="100">
                        <template #default="scope">
                            {{ scope.row.fileSize ? formatFileSize(scope.row.fileSize) : '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="fileType" :label="t('File Type')" width="100">
                        <template #default="scope">
                            {{ scope.row.name.includes('.') ? scope.row.name.split('.').pop() : t('Unknown') }}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="download-actions d-flex align-items-center pl-3 pr-3 justify-sm-between">
                    <!-- 全选 -->
                    <div class="select-all mr-3">
                        <el-checkbox id="select-all" v-model="isAllSelected" :label="t('Select All')" @change="toggleSelectAll" />
                    </div>
                    <!-- 下载按钮 -->
                    <el-button class="download-btn" type="primary" @click="downloadSelected">
                        {{ t('Download') }}
                    </el-button>
                </div>
                <!-- 分页 -->
                <div class="pagination-container">
                    <el-pagination
                        v-model:current-page="currentPage"
                        :background="true"
                        layout="total, prev, pager, next"
                        :total="total"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { ElMessage } from 'element-plus'
    import type { CheckboxValueType } from 'element-plus'
    import FileSaver from 'file-saver'
    import getDownloadList from '~/http/apis/getDownloadList'

    // 分页相关数据
    const currentPage = ref(1)

    const route = useRoute()
    const { locale, t } = useI18n()

    let relatedType = ''
    let relatedId = ''

    const relatedTypeMap = {
        product: '1'
    }

    if (route.params.path.length === 1) {
        relatedType = '0'
        relatedId = route.params.path[0]
    } else if (route.params.path.length === 2) {
        relatedType = relatedTypeMap[route.params.path[0] as keyof typeof relatedTypeMap]
        relatedId = route.params.path[1]
    }

    const title = computed(() => {
        if (relatedType === '0') {
            return t('Product Catalog Download')
        } else {
            return t('2D & 3D Download')
        }
    })

    const { data, pending } = useAsyncData(
        () => `download-files_${locale.value}_${relatedType}_${relatedId}_${currentPage.value}`,
        () => getDownloadList({
            relatedType,
            relatedId,
            languageCode: locale.value,
            page: currentPage.value
        }),
        {
            watch: [currentPage],
            server: false
        }
    )

    const downloadFiles = computed(() => data.value?.rows || [])
    const total = computed(() => data.value?.total || 0)

    // 已选择的文件
    const selectedFileIds = ref<number[]>([])

    // 判断是否全部选中
    const isAllSelected = computed(() => {
        return selectedFileIds.value.length === downloadFiles.value.length
    })

    // 处理单个复选框变化
    const handleCheckboxChange = (checked: boolean, id: number) => {
        if (checked) {
            if (!selectedFileIds.value.includes(id)) {
                selectedFileIds.value.push(id)
            }
        } else {
            selectedFileIds.value = selectedFileIds.value.filter(item => item !== id)
        }
    }

    // 全选/取消全选
    const toggleSelectAll = (val: CheckboxValueType) => {
        if (val) {
            selectedFileIds.value = downloadFiles.value.map(file => file.id)
        } else {
            selectedFileIds.value = []
        }
    }

    // 处理当前页变化
    const handleCurrentChange = (page: number) => {
        currentPage.value = page
    }

    // 下载选中的文件
    const downloadSelected = () => {
        if (selectedFileIds.value.length === 0) {
            ElMessage.warning('请至少选择一个文件')
            return
        }

        selectedFileIds.value.forEach(id => {
            const file = downloadFiles.value.find(file => file.id === id)!
            FileSaver.saveAs(file.path, file.name)
        })
    }
</script>

<style scoped lang="less">
#download-page {
    min-height: 300px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;

    .e-container {
        max-width: 1200px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .header-container {
        flex: 1;
        max-width: 100%;
        margin-bottom: 30px;

        .title {
            font-size: 28px;
            color: rgba(51, 51, 51, 1);
            text-align: center;
            font-weight: bold;
        }
    }

    .download-content {
        flex: 1;
        max-width: 100%;
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: rgba(245, 245, 245, 1);
        margin-top: 0;
        padding-top: 15px;
        background: #fff;
        margin-bottom: 20px;

        .pagination-container {
            margin-top: 20px;
            padding: 15px;
            display: flex;
            justify-content: center;
        }

        .download-actions {
            margin-top: 20px;
            padding: 15px;

            .select-all {
                height: 30px;
                line-height: 30px;
            }

            .download-btn {
                font-size: 12px;
                padding-left: 1rem;
                padding-right: 1rem;
            }
        }
    }
}

// 辅助类
.d-flex {
    display: flex;
}

.align-items-center {
    align-items: center;
}

.border {
    border: 1px solid #dee2e6;
}

.mb-2 {
    margin-bottom: 0.5rem;
}

.pl-3 {
    padding-left: 1rem;
}

.pr-3 {
    padding-right: 1rem;
}

.text-nowrap {
    white-space: nowrap;
}

.text-dark {
    color: #343a40;
}

.text-secondary {
    color: #6c757d;
}

.text-right {
    text-align: right;
}

.mr-3 {
    margin-right: 1rem;
}

.flex1 {
    flex: 1;
}

// 移动端适配
@media screen and (max-width: 768px) {
    #download-page {
        .e-container {
            padding-left: 0;
            padding-right: 0;
        }

        .download-content {
            padding-left: 0;
            padding-right: 0;

            .justify-sm-between {
                justify-content: space-between;
            }
        }
    }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
    #download-page .e-container {
        padding-left: 0;
        padding-right: 0;
    }
}
</style>
