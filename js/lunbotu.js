var doms = {
    carousel:document.querySelector('.carousel'),
    indicators:document.querySelectorAll('.indicator span'),
    leftArrow: document.querySelector('.left-arrow'),   
    rightArrow: document.querySelector('.right-arrow')  
};

let currentIndex = 0;
const totalItems = document.querySelectorAll('.item').length;
let timer = null;      // 自动轮播定时器
let resumeTimer = null; // 恢复自动轮播的定时器

/* 轮播图移到到第几个板块
   index为板块的索引
*/
//var curIndex = 0;
function moveTo(index){
    // 强制恢复过渡动画
doms.carousel.style.transition = '1.2s';
doms.carousel.style.transform = `translateX(-${index}00%)`;
currentIndex = index;
//去除当前选中的指示器
var active = document.querySelector('.indicator span.active');
active.classList.remove('active');

//重新设置要选择的指示器
doms.indicators[index].classList.add('active');
//curIndex = index;
}

//设置点击事件
function startAutoPlay() {
    // 先清除已有定时器
    clearInterval(timer);
    timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      moveTo(currentIndex);
    }, 2500);
  }
  
  // 初始化自动轮播
  startAutoPlay();
  
  // 指示器点击处理
  doms.indicators.forEach((item, i) => {
    item.onclick = () => {
      // 清除所有定时器
      clearInterval(timer);
      clearTimeout(resumeTimer);
      
      // 切换图片
      moveTo(i);
      
      // 2秒后重新启动自动轮播
      resumeTimer = setTimeout(startAutoPlay, 2500);
    };
  });

  function init(){
    //复制第一张图
    var first = doms.carousel.firstElementChild.cloneNode(true);
    //复制最后一张图
    var last = doms.carousel.lastElementChild.cloneNode(true);
    //将第一张图片放到末尾
    doms.carousel.appendChild(first);
    //将最后一张图片放到第一张前面
    doms.carousel.insertBefore(last,doms.carousel.firstChild);
  }
  init();

  const count = totalItems;
  function leftNest(){

     //清除定时器
  clearInterval(timer);
  clearTimeout(resumeTimer);
    if(currentIndex == 0){
        doms.carousel.style.transform = `translateX(-${count - 1}00%)`;
        doms.carousel.style.transition= 'none';
        doms.carousel.clientHeight;//强制渲染
        moveTo(count - 1);
    }else{
        moveTo(currentIndex - 1);
        //2秒后恢复自动轮播
  resumeTimer = setTimeout(startAutoPlay, 2500);
    }
  }

  function rightNext(){
    //清除定时器
    clearInterval(timer);
  clearTimeout(resumeTimer);
    if(currentIndex == count - 1){
        doms.carousel.style.transform = `translateX(000%)`;
        doms.carousel.style.transition = 'none';
        doms.carousel.clientHeight;//强制渲染
        moveTo(0);
    }else{
        moveTo(currentIndex + 1);
         //2秒后恢复自动轮播
        resumeTimer = setTimeout(startAutoPlay, 2500);
    }
  }

doms.leftArrow.onclick = leftNest;
doms.rightArrow.onclick = rightNext;