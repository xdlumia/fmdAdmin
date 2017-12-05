<template>
    <div>
		<div class="house-l">
					<!--大轮播-->
		    <div class="swiper-container ga">
			        <div class="bbb swiper-wrapper">
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""><div class="swiper-check"><input checked="checked" type="radio" name="name" value="" /><i></i></div></div>
			            <!--<div class="swiper-slide"><img src="../assets/img/u161.png" alt=""><div class="swiper-check"><input type="radio" name="name" value="" /><i></i></div></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""><div class="swiper-check"><input type="radio" name="name" value="" /><i></i></div></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""><div class="swiper-check"><input type="radio" name="name" value="" /><i></i></div> </div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""><div class="swiper-check"><input type="radio" name="name" value="" /><i></i></div></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""><div class="swiper-check"><input type="radio" name="name" value="" /><i></i></div></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""><div class="swiper-check"><input type="radio" name="name" value="" /><i></i></div></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""><div class="swiper-check"><input type="radio" name="name" value="" /><i></i></div></div>-->
			        </div>
			    <div class="swiper-button-prev swiper-button-white" style="
background-image:none;"><span></span></div>
		        <div class="swiper-button-next swiper-button-white" style="
background-image:none;"><span></span></div>
	        	
		    </div>
		</div>
	</div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳',];

import Swiper1 from '../../static/swiper.js'

export default {
	name: 'Swiper1',
    data() {
      return {
       
      };
    },
    methods:{
    	lunbo1(){
		    
		    var ga = new Swiper1('.ga', {
		    	navigation: {
			        nextEl: '.swiper-button-next',
			        prevEl: '.swiper-button-prev',
			      },
		        spaceBetween: 10,
		        centeredSlides: true,
		        slidesPerView: 'auto',
		        touchRatio: 0.2,
		        slideToClickedSlide: true
		    });
    	}
    },
    mounted(){
    	this.lunbo1()
    }

  }
</script>
<style scoped="scoped">
	@import "../assets/css/swiper.css"; 
	.swiper-container {
        width: 100%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-slide {
        background-size: cover;
        background-position: center;
        position: relative;
    }
    .gallery-top {
        height: 80%;
        width: 100%;
    }
    .ga {
        height: 20%;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .ga .swiper-slide {
        width: 32%;
        height: 100%;
        opacity: 0.4;
    }
    .ga .swiper-slide-active {
        opacity: 1;
    }
 .aaa{
    	width: 710px;
    	height: 400px;
    }
    .swiper-container{
    	position: relative;
    }

    .bbb{
    	width: 630px;
		height: 80px;
		left: -212px;
    }
	.aaa img{
		width: 710px;
		height: 400px;
	}
	.bbb img{
		width: 200px;
		height: 112px;
		float: left;
		margin-right: 0px;
	}
	/*.swiper-slide-active{
		margin-right: 97px !important;
	}*/

	.swiper-container{
		height: 120px;
	}
	.swiper-button-white{
		height: 120px !important;
		margin-top: -50px !important;
	}
	.swiper-button-white{
		width: 30px;
		height: 80px;
		background: rgba(0,0,0,.7);
		margin-top: -40px;
	}
	.swiper-button-prev{
		left: 0px;
	}
	.swiper-button-prev span:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: translate(-50%, -50%) rotate(45deg);
}
	.swiper-button-next{
		right: 0px ;
	}
	.swiper-button-next span:before{
    content: "";
    position: absolute;
    top: 50%;
    left: 22%;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    border-right: 2px solid #fff;
    border-top: 2px solid #fff;
    transform: translate(-50%, -50%) rotate(45deg);
	}
	.house-l{

		width: 710px;
	}
	.swiper-check{position:absolute; right:0; bottom:-30px; width: 30px; height: 30px;}
	.swiper-check input{ z-index: 1; opacity: 0; display: block; position:absolute; width: 100%;height:100%;}
	.swiper-check input ~ i{position:absolute;  width: 100%;height:100%; background: rgba(153, 153, 153, 1);}
	.swiper-check input ~ i:before{content:""; position:absolute;left:8px;top:2px;  width:10px;height:18px; border:4px solid #fff; border-left:none;border-top:none; transform: rotate(45deg);}
	.swiper-check input:checked ~ i{background: rgba(95, 199, 147, 1);}
</style>
