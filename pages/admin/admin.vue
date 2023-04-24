<template>  
    <view>  
        <web-view src="https://ehre.top/admin" @message="handleMessage"></web-view>  
    </view>  
</template>  

<script>  
    export default {  
        methods: {  
            handleMessage(evt) {  
                console.log('接收到的消息：' + JSON.stringify(evt.detail.data));  
            }  
        }  
    }  
</script>
