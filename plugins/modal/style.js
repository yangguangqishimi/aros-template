export default `

.weex-bmModal-wrap {
  display: none;
  position: fixed;
  z-index: 999999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
}

.weex-bmModal-node {
  position: fixed;
  z-index: 9999999999;
  top: 50%;
  left: 50%;
  min-height: 2.666667rem;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  flex-direction: cloumn;
  background-color: transparent;
}
.weex-bmModal-node .hide {
  display: none;
}

.weex-bmModal-node .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 1.866667rem;
  box-sizing: border-box;
  font-size: 0.426667rem;
  line-height: 0.426667rem;
  padding: 0.413333rem;
  border-radius: 0.133333rem;
  background-color: #fff;
}

.weex-bmModal-node .loading-image {
  width: 1.866667rem;
  height: 1.866667rem;
  box-sizing: border-box;
  background-image: url('/dist/assets/images/loading.gif');
  background-repeat:no-repeat; 
  background-size:100% 100%;
  margin-bottom: 0.3rem;
}
.weex-bmModal-node .content-msg {
  color: #666;
  font-size: 0.426667rem;
}
`
