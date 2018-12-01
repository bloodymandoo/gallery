import React from 'react'

class ControllerUnit extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = function(e){
      if(this.props.arrange.isCenter){
        this.props.inverse()
      }else{
        this.props.center()
      }
      
      e.stopPropagation()
      e.preventDefault()
    }.bind(this)
  }
  render() {
    let styleObj = {},
    imgFifureClassName = 'iconfont controller-unit'
    imgFifureClassName += this.props.arrange.isInverse ?
    ' is-inverse' : ''

    if(this.props.arrange.rotate){
      (['MozTransform','msTransForm','WebkitTransform','']).forEach(function(value){
        styleObj[value] = 'rotate(' + this.props.arrange.rotate
          + 'deg)'
      }.bind(this))
    }

    if(this.props.arrange.isCenter){
      imgFifureClassName += ' is-center'
    }

    return (
      <span
      className={imgFifureClassName}
      onClick={this.handleClick}>
      </span>
    );
  }
}

export default ControllerUnit;