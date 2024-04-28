<template>
    <div class="photo-container" ref="scrollContainer">
        <div class="photo" ref="photoWrapper">
            <van-image 
                v-for="(image, index) in images" 
                :key="index" 
                :class="{ 'visible': index === 0 || scrollPosition >= index * 100 }"
                 
                fit="cover" 
                position="center"
                :src="image" 
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Image } from 'vant';

const images = [
    'https://www.codelover.club/files/stutasks/userID_884/currNo_29/照片/FviulPire291Y26x3GalCdW20vyb.png',
    'https://www.codelover.club/files/stutasks/userID_884/currNo_29/照片/Fl-w-mJlDURQrSBSL6UIqvwTZ2lZ.png',
    'https://www.codelover.club/files/stutasks/userID_884/currNo_29/照片/FuKa16711NRiunaar-ANzftP2_-o.png',
    'https://www.codelover.club/files/stutasks/userID_884/currNo_29/照片/FsZGTuiY_HkddeIEh5IszMsjNGuR.png'
];
const scrollContainer = ref(null);
const photoWrapper = ref(null);
let scrollPosition = 0;

onMounted(() => {
    scrollContainer.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    scrollContainer.value.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    scrollPosition = scrollContainer.value.scrollTop;
};
</script>

<style scoped>
.photo-container {
    width: 90vw;
    height: 80vh; /* 调整为合适高度 */
    overflow-y: auto;
    position: relative;
    margin-top: 5vh;
}

.photo {
    position: relative;
    transition: opacity 0.5s ease-out; /* 平滑过渡效果 */
    height: 100vh;
}

@media(max-width:450px){
    .photo-container{
        width: 90vw;
        height: 50vw;
        margin-top: 5vh;
    }

    .photo{
        width: 100%;
    }
}


</style>