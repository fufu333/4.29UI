<template>
    <div class="container">
        <van-search class="search-input" v-model="searchInputValue" input-align="center" placeholder="请输入搜索关键词" @search="onSearch" />
        <van-dropdown-menu ref="menuRef" class="dropdown">
            <van-dropdown-item v-model="taskValue" :options="taskOptions" />
            <van-dropdown-item title="筛选">
                <template #default>
                    <van-cell center title="小组任务">
                        <template #right-icon><van-switch v-model="filters.groupTaskSwitch" /></template>
                    </van-cell>
                </template>
            </van-dropdown-item>
        </van-dropdown-menu>
        <div class="score-list" ref="containerRef">
            <div class="xinxi">
                <p>测试学生333</p>
                <span>班级:22软件技术1班</span>
            </div>
            <van-cell-group v-for="(item, index) in filteredScoreList" :key="index" class="score-item">
                <div class="info-container">
                    <div class="detail-info">
                        <div>
                            <span class="course">课程：{{ item.courses }}</span>
                        </div>
                        <van-cell>
                            <template #value><van-button hairline plain type="primary" style="color:white;background-color:255, 116, 116 !important;height: 4vh;width: 15% !important;">浏览</van-button></template>
                        </van-cell>
                    </div>
                    <div class="tag-container">
                        <van-tag class="score" type="danger" style="background-color:rgb(252, 145, 74);justify-content: center;">{{ item.score }}</van-tag>
                        <van-tag class="state" type="danger" style="background-color:rgb(252, 145, 74); justify-content: center;">{{ item.state }}</van-tag>
                    </div>
                </div>
            </van-cell-group>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import useScrollToBottom from '../useScrollToBottom'

interface TestScore {
    score: string;
    state: string;
    courses: string;
    classNames: string;
}

const containerRef = ref<null | HTMLElement>(null);
const searchInputValue = ref('');
const taskValue = ref(0);
const currentIndex = ref(8);

const filters = reactive({
    myFeedbackSwitch: false,
    groupTaskSwitch: false,
});

const taskOptions = [
    { text: '全部课程', value: 0 },
    { text: 'Vue3开发初体验', value: 1 },
    { text: 'Vue3组件化开发', value: 2 },
    { text: 'Vue前端基础刷题', value: 3 },
    { text: 'Vue3路由的使用', value: 4 },
    { text: '电影列表项目', value: 5 },
    { text: 'Vue自动化测试', value: 6 },
    { text: '状态管理Pinia', value: 7 },
    { text: '使用UI组件库', value: 8 },
]

const handleNewData = (newData: any[]) => {
    console.log('新数据已加载:', newData);

};

const onSearch = () => {
    // 直接通过搜索输入更新filteredScoreList，无需手动修改
    searchInputValue.value = searchInputValue.value.trim().toLowerCase(); // 确保搜索值处理（如去空格、转小写）
};

const visibleScoreList = computed(() => testScoreList.value.slice(0, currentIndex.value));

// 新增filteredScoreList用于搜索过滤后的列表
const filteredScoreList = computed(() => {
    if (!searchInputValue.value) return visibleScoreList.value;
    return visibleScoreList.value.filter(item => item.courses.toLowerCase().includes(searchInputValue.value.toLowerCase()));
});

// Data initialization
const testScoreList = ref<TestScore[]>([]);
onMounted(() => {
    const courses = ['Vue3开发初体验', 'Vue3组件化开发', 'Vue前端基础刷题', 'Vue3路由的使用', '电影列表项目', 'Vue自动化测试', '状态管理Pinia', '使用UI组件库'];
    for (let i = 0; i < courses.length; i++) {
        testScoreList.value.push({
            score: '待评分',
            state: '待提交',
            courses: courses[i],
            classNames: '22软件技术1班',
        });
    }
    currentIndex.value = courses.length;
    useScrollToBottom(containerRef, currentIndex, testScoreList, handleNewData);
});
</script>

<style lang="scss" scoped>
.container {
    height: 60vh;

    .search-input {
        margin-top: 5%;
    }

    .dropdown {
        position: sticky;
        top: 0;
        z-index: 999;
        width: 100%;

    }

    .score-list {
        flex-direction: column;
        overflow-y: auto;
        height: 90%;

        .xinxi {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #000000;
                white-space: nowrap;
                padding-left:10%;
                padding-right: 10%;
                width: 80%;
                background-color: rgb(255, 255, 255);
            }

        .score-item {
            width: 100%;
            min-height: 50px;

            

            .info-container {
                flex-direction: column;
                gap: 5px;

                .detail-info {
                    font-size: 14px;
                    color: #999;
                    line-height: 2;
                    text-align: left;
                    margin-left: 3%;
                    margin-bottom: 1vh;

                    .course{
                        font-size: 20px;
                        margin-top: 20px;
                    }
                }

                .tag-container {
                    display: flex;
                    align-items: flex-end;
                    width: 20vh;

                    .score,
                    .state {
                        height: 4vh;
                        width: 6vh;
                        margin-left: 15px;
                        border-radius: 20px;
                    }
                }

                .feedback-control {
                    margin-top: 5%;

                }
            }
        }
    }

}
</style>
