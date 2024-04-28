// ./src/useScrollToBottom.ts
import { onMounted, onUnmounted, Ref, unref } from 'vue';

// 假设这是从后端获取更多数据的方法
const fetchMoreData = async (currentCount: number) => {
  // 模拟异步获取数据，实际应用中替换为真实的API调用
  await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟延迟
  // 假设每次获取10条数据
  return Array.from({ length: 10 }, (_, i) => `新数据 ${currentCount + i}`);
};

export default function useScrollToBottom(

  containerRef: Ref<null | HTMLElement>,
  currentIndexRef: Ref<number>,
  testScoreListRef: Ref<any[]>,
  callback: (newData: any[]) => void
) {
  let isHandlingScroll = false;

  const handleScroll = async () => {
    if (!unref(containerRef) || isHandlingScroll) return;
    const container = unref(containerRef);

    if ((container!.scrollHeight - container!.scrollTop - container!.clientHeight) <= 1) {
      if (!isHandlingScroll) {
        isHandlingScroll = true;
        try {
          const newData = await fetchMoreData(currentIndexRef.value);
          // 更新数据和currentIndex
          currentIndexRef.value += newData.length;
testScoreListRef.value.push(...newData);
          callback(newData);
        } finally {
          setTimeout(() => {
            isHandlingScroll = false;
          }, 200);
        }
      }
    }
  };

  onMounted(() => {
    const container = unref(containerRef);
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  });

  onUnmounted(() => {
    const container = unref(containerRef);
    if (container) {
      container.removeEventListener('scroll', handleScroll);
    }
  });
}