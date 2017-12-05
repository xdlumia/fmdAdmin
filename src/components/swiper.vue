<template>
    <div>
		<div class="house-l">
					<!--大轮播-->
					
			<div class="swiper-container gallery-top">
		        <div class="aaa swiper-wrapper">
		           <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		        </div>
		         <!--Add Arrows--> 
		        
		    </div>
		    <div class="swiper-container gallery-thumbs">
			        <div class="bbb swiper-wrapper">
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
			            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
		            <div class="swiper-slide"><img src="../assets/img/u161.png" alt=""></div>
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

import Swiper from '../../static/swiper.js'

export default {
	name: 'Swiper',
    data() {
      return {
       
      };
    },
    methods:{
    	lunbo(){
		    var galleryTop = new Swiper('.gallery-top', {
		         navigation: {
			        nextEl: '.swiper-button-next',
			        prevEl: '.swiper-button-prev',
			      },

		        spaceBetween: 10,
		    });
		    var galleryThumbs = new Swiper('.gallery-thumbs', {
		        spaceBetween: 10,
		        centeredSlides: true,
		        slidesPerView: 'auto',
		        touchRatio: 0.2,
		        slideToClickedSlide: true
		    });
		     galleryTop.controller.control = galleryThumbs;
   			 galleryThumbs.controller.control = galleryTop;

		    
    	}
    },
    mounted(){
    	this.lunbo()
    }

  }
</script>
<style>
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
    }
    .gallery-top {
        height: 80%;
        width: 100%;
    }
    .gallery-thumbs {
        height: 20%;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }
    .gallery-thumbs .swiper-slide-active {
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
		left: -266px;
    }
	.aaa img{
		width: 710px;
		height: 400px;
	}
	.bbb img{
		width: 120px;
		height: 80px;
		float: left;
		margin-right: 0px;
	}
  	.gallery-thumbs .swiper-slide {
	    width: 18%;
	    height: 100%;
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
</style>