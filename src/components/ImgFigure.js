import React from 'react'

class ImgFigure extends React.Component {
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
    imgFifureClassName = 'img-figure'
    imgFifureClassName += this.props.arrange.isInverse ?
    ' is-inverse' : ''

    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos
    }

    if(this.props.arrange.rotate){
      (['MozTransform','msTransForm','WebkitTransform','']).forEach(function(value){
        styleObj[value] = 'rotate(' + this.props.arrange.rotate
          + 'deg)'
      }.bind(this))
    }

    if(this.props.arrange.isCenter){
      styleObj.zIndex = 101
    }

    return (
      <figure
      className={imgFifureClassName}
      style={styleObj}
      onClick={this.handleClick}>
        <img src={this.props.data.imgUrl} alt={this.props.data.fileName}/>
        <figcaption>
          <h3 className="img-title">{this.props.data.title}</h3>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

export default ImgFigure;