<template>
    <div class="container">
        <van-search class="search-input" v-model="searchInputValue" input-align="center" placeholder="请输入搜索关键词" />
        <van-dropdown-menu ref="menuRef" class="dropdown">
            <van-dropdown-item v-model="taskValue" :options="taskOptions" />
            <van-dropdown-item v-model="classValue" :options="classOptions" />
            <van-dropdown-item title="筛选">
                <template #default>
                    <van-cell center title="小组任务">
                        <template #right-icon><van-switch v-model="filters.groupTaskSwitch" /></template>
                    </van-cell>

                </template>
            </van-dropdown-item>
        </van-dropdown-menu>
        <div class="score-list" ref="containerRef">
            <van-cell-group v-for="(item, index) in filteredItems" :key="index" class="score-item">
                <van-cell center :title="item.name">
                    <template #value><van-button hairline plain size="small" type="primary"
                            style="color:white;background-color:rgb(255, 87, 87)  !important;height: 4vh;">浏览</van-button></template>
                </van-cell>

                <div class="info-container">
                    <!-- 详细信息文本 -->
                    <div class="detail-info">
                        <div>
                            <span v-if="item.comment">{{ item.comment }}</span>
                        </div>
                        <div>
                            <span>课程：{{ item.courses }}</span>
                        </div>
                        <div>
                            <span>班级: {{ item.classNames }}</span>
                        </div>
                    </div>
                    <!-- 分数与状态标签 -->
                    <div class="tag-container">
                        <van-tag class="score" type="danger"
                            style="background-color:rgb(252, 145, 74);justify-content: center; ">{{ item.score }}
                        </van-tag>
                        <van-tag class="state" type="danger"
                            style="background-color:rgb(252, 145, 74); justify-content: center; ">{{ item.state }}
                        </van-tag>
                    </div>
                    <div class="feedback-control">
                        <component :is="currentComponent" @input="handleInput" @submit="handleSubmit"
                            style="color:white;background-color:#4ab4ff !important;width: 20% !important;" />
                    </div>
                </div>
            </van-cell-group>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import useScrollToBottom from '../useScrollToBottom';
import ButtonComponent from '../components/ButtonComponent.vue'; // 按钮组件
import InputComponent from '../components/InputComponent.vue';

interface TestScore {
    name: string;
    score: '待评分';
    comment: string;
    state: '待提交';
    courses: number;
    classNames: string;
}

const containerRef = ref<null | HTMLElement>(null);
const searchInputValue = ref('');
const inputValue = ref('');
const taskValue = ref(0);
const classValue = ref(0);
const currentIndex = ref(0);
const filteredResult = ref<any[]>([]);


const onSearch = () => {
    const keyword = searchInputValue.value.trim().toLowerCase();

    let filtered = testScoreList.value;

    // 根据 taskValue 和 classValue 过滤
    if (taskValue.value !== 0) {
        filtered = filtered.filter(item => item.courses === taskOptions.find(option => option.value === taskValue.value)?.text);
    }
    if (classValue.value !== 0) {
        filtered = filtered.filter(item => item.classNames === classOptions.find(option => option.value === classValue.value)?.text);
    }

    // 如果有搜索关键词，再进行关键字匹配
    if (keyword) {
        filtered = filtered.filter(item =>
            item.courses.toLowerCase().includes(keyword) || item.classNames.toLowerCase().includes(keyword)
        );
    }

    filteredResult.value = filtered;
};

const filteredItems = computed(() => {
    // 初始情况下显示所有数据
    return testScoreList.value;
});

const filters = reactive({
    myFeedbackSwitch: false,
    groupTaskSwitch: false,
});

const taskOptions = [
    { text: '全部课程', value: 0 },
    { text: 'Vue3开发初体验', value: 1 },
    { text: 'Vue3组件化开发', value: 2 },
    { text: 'Vue前端基础刷题', value: 3 },
]

const classOptions = [
    { text: '全部班级', value: 0 },
    { text: '21软件技术1班', value: 1 },
    { text: '22软件技术1班', value: 2 },
    { text: '22软件技术3班', value: 3 }
]

const handleNewData = (newData: any[]) => {
    console.log('新数据已加载:', newData);

};

const currentComponent = computed(() => {
    return inputValue.value ? InputComponent : ButtonComponent;
});

const handleInput = (value) => {
    inputValue.value = value;
};

const handleSubmit = () => {

    console.log('提交的反馈:', inputValue.value);
    inputValue.value = '';
};

const visibleScoreList = computed(() => testScoreList.value.slice(0, currentIndex.value));

// Data initialization
const testScoreList = ref<any[]>([]);
onMounted(() => {
    const courses = ['Vue3开发初体验', 'Vue3组件化开发', 'Vue前端基础刷题']
    const classNames = ['21软件技术1班', '22软件技术1班', '22软件技术3班'];
    for (let i = 0; i < 10; i++) {
        testScoreList.value.push({
            name: `学生${i}`,
            score: '待评分',
            comment: `学号${Math.floor(Math.random() * 1000000)}`,
            state: '待提交',
            courses: courses[Math.floor(Math.random() * courses.length)],
            classNames: classNames[Math.floor(Math.random() * classNames.length)],
        });
    }
    currentIndex.value = 10;
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

        .van-dropdown-item__content {
            left: 20px;
            width: calc(-40px + 100vw);
        }
    }

    .score-list {
        flex-direction: column;
        overflow-y: auto;
        height: 90%;

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
                        ;
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
