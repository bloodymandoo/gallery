import React from 'react'
import ReactDOM from 'react-dom'
import ImgFigure from './ImgFigure'
import ControllerUnit from './ControllerUnit'

let imgDatas = require('../datas/imgData.json')

imgDatas = (function(imgDatasArr){
  for(let i = 0,j = imgDatasArr.length;i < j;i++){
    let tempData = imgDatasArr[i]
    tempData.imgUrl = require('../images/' + tempData.fileName)
    imgDatasArr[i] = tempData
  }
  return imgDatasArr
})(imgDatas)

let constant = {
  centerPos: {
    left: 0,
    right: 0
  },
  hPosRange: {
    leftSecX: [0, 0],
    rightSecX: [0, 0],
    y: [0, 0]
  },
  vPosRange: {
    x: [0, 0],
    topY: [0, 0]
  }
}

function getRangeRandom(low, hight){
  return Math.ceil(Math.random() * (hight - low) + low)
}

function get30DegRandom() {
  return (Math.random() > 0.5 ? 1 : -1) * Math.ceil(Math.random() * 30)
}
class StageComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgsArrangeArr: []
    }
    this.constant = constant
    this.rearrange = function(centerIndex){
      let imgsArrangeArr = this.state.imgsArrangeArr,
        constant = this.constant,
        centerPos = constant.centerPos,
        hPosRange = constant.hPosRange,
        vPosRange = constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.ceil(Math.random() * 2),
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1)

        imgsArrangeCenterArr[0]= {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        }

        topImgSpliceIndex = Math.ceil(Math.random() *
        (imgsArrangeArr.length - topImgNum))
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum)

        imgsArrangeTopArr.forEach(function(value, index) {
          imgsArrangeTopArr[index] = {
            pos: {
              top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
              left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            },
            rotate: get30DegRandom(),
            isCenter: false
          }
        })

        for(let i = 0, j = imgsArrangeArr.length, k = j / 2;i < j;i++){
          let hPosRangeLR = null
          if(i < k){
            hPosRangeLR = hPosRangeLeftSecX
          }else{
            hPosRangeLR = hPosRangeRightSecX
          }
          imgsArrangeArr[i] = {
            pos: {
              top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
              left: getRangeRandom(hPosRangeLR[0], hPosRangeLR[1])
            },
            rotate: get30DegRandom(),
            isCenter: false
          }
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeTopArr.forEach(function(value, index){
            imgsArrangeArr.splice(topImgSpliceIndex + index, 0,
              imgsArrangeTopArr[index])
          })
        }

        if(imgsArrangeCenterArr && imgsArrangeCenterArr[0]){
          imgsArrangeArr.splice(centerIndex, 0,
            imgsArrangeCenterArr[0])
        }

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        })
    }
    this.inverse = function(index){
      return function(){
        let imgsArrangeArr = this.state.imgsArrangeArr
        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        })
      }.bind(this)
    }
    this.center = function(index){
      return function(){
        this.rearrange(index)
      }.bind(this)
    }
  }

  getInitialStage() {
    return {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   },
        //   rotate: 0,
        //   isInverse: false
        //   isCenter: false
        // }
      ]
    }
  }

  componentDidMount() {
    let stageDom = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDom.scrollWidth,
      stageH = stageDom.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2)

    let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDom.scrollWidth,
      imgH = imgFigureDom.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2)

    this.constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    this.constant.hPosRange.leftSecX[0] = -halfImgW
    this.constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3
    this.constant.hPosRange.rightSecX[0] = halfStageW + halfImgW
    this.constant.hPosRange.rightSecX[1] = stageW - halfImgW
    this.constant.hPosRange.y[0] = -halfImgH
    this.constant.hPosRange.y[1] = stageH - halfImgH

    this.constant.vPosRange.topY[0] = -halfImgH
    this.constant.vPosRange.topY[1] = halfStageH - halfImgH * 3
    this.constant.vPosRange.x[0] = halfStageW - imgW
    this.constant.vPosRange.x[1] = halfStageW
    this.rearrange(0)
  }
  render() {
    let controllerUnits = []
    let imgFigures = []

    imgDatas.forEach(function(value,index) {
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imgFigures.push(<ImgFigure
        data={value}
        key={index}
        arrange={this.state.imgsArrangeArr[index]}
        inverse={this.inverse(index)}
        center={this.center(index)}
        ref={'imgFigure' + index}/>)

      controllerUnits.push(<ControllerUnit
      key={index}
      arrange={this.state.imgsArrangeArr[index]}
      inverse={this.inverse(index)}
      center={this.center(index)}
      />)
    }.bind(this))
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

StageComponent.defaultProps = {

};

export default StageComponent;