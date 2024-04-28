<template>
  <div class="profile-page">
    <van-row justify="center">
      <van-col span="24">
        <h1 class="title">WELCOME TO MY HOMEPAGE</h1>
      </van-col>
    </van-row>
    <van-row justify="center">
      <van-col span="24">
        <h2 class="sub-title">这里是 是福福惹 的主页</h2>
      </van-col>
    </van-row>

    <div class="inline-cell">
      <van-cell title="姓名:"  value="尤晓玲"  center />
    </div>
    <div class="inline-cell">
      <van-cell title="学号:" value="22000953" center />
    </div>
    <div class="inline-cell">
      <van-cell title="短期目标:" value="成为前端技术“砖家”" center />
    </div>
    <div class="inline-cell">
      <van-cell title="个性说说：" value="高山仰止，景行行止" center />
    </div>
  </div>
</template>

<script>
import { Row, Col, Cell } from 'vant';

export default {
  name: 'ProfilePage',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell
  }
};
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;

}

.title {
  font-size: 3vh;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.sub-title {
  color: #f1c367;
  font-size: 4vh;
  margin-bottom: 20px;
}

.inline-cell {
  display: flex;
  align-items: center;
}

.inline-cell .van-cell__title,
.inline-cell .van-cell__value {
  display: inline-block;
  vertical-align: middle;
  
}

.inline-cell .van-cell {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px;
  font-size: 2.5vh;
  background-color: transparent;
}

</style>