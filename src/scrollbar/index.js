import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const SCROLL_DIRECTION = {
  VERTICAL: 'Vertical',
  HORIZONTAL: 'Horizontal',
};

const _document = document;
const _window = window;

class ScrollBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thumbVertical: {
        height: 0,
        top: 0,
      },
      thumbHorizontal: {
        width: 0,
        left: 0,
      },
      isScrollVertical: false,
      isScrolHorizontal: false,
      currentTopOfThumb: 0,
      currentleftOfThumb: 0,
      currentClientX: 0,
      currentClientY: 0,
      isActiveVerticalScroll: false,
      isActiveHorizontalScroll: false,
    };

    this.scrollContainer = React.createRef();
    // scroll
    this.onLoad();
    this.onResize();
    this.onDocumentMouseMove();
    this.onDocumentMouseUp();
    // binding
    this.onScroll = this.onScroll.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  //init
  initScrollBar(context) {
    if(context) {
      const {
        clientHeight,
        clientWidth,
        scrollHeight,
        scrollWidth,
      } = this.scrollContainer.current;

      this.setState({
        thumbVertical: {
          height: clientHeight / (scrollHeight / clientHeight),
          top: (this.scrollContainer.current.scrollTop / scrollHeight) * 100 + '%',
        },
        thumbHorizontal: {
          width: clientWidth / (scrollWidth / clientWidth),
          left: (this.scrollContainer.current.scrollLeft / scrollWidth) * 100 + '%',
        },
        isActiveVerticalScroll: (scrollHeight > clientHeight),
        isActiveHorizontalScroll: (scrollWidth > clientWidth),
      });
    }
  }

  //onload
  onLoad() {
    _document.addEventListener('DOMContentLoaded', e => {
      this.initScrollBar(this.scrollContainer.current);
    });
  }

  //onresize
  onResize(){
    _window.addEventListener('resize', () =>{
      this.initScrollBar(this.scrollContainer.current);
    });
  }
  
  //onmousemove
  onDocumentMouseMove() {
    _document.addEventListener('mousemove', e => {
      if(this.scrollContainer.current) {
        const {
          scrollHeight,
          clientHeight,
          scrollWidth,
          clientWidth,
        } = this.scrollContainer.current;
        const {
          currentTopOfThumb,
          currentClientY,
          currentleftOfThumb,
          currentClientX,
          isScrollVertical,
          isScrolHorizontal
        } = this.state;
        
        if(isScrollVertical || isScrolHorizontal) {
          _document.body.style.userSelect = 'none';
          _document.body.style.webkitUserSelect = 'none';
          _document.body.style.mozUserSelect = 'none';
          _document.body.style.msUserSelect = 'none';
        }

        if(isScrollVertical) {
          const ratioHeightScroll = scrollHeight / clientHeight;
          let scrollTop = Math.round((currentTopOfThumb + (e.clientY - currentClientY)) * ratioHeightScroll);
          this.scrollContainer.current.scrollTop = scrollTop;
        } else if(isScrolHorizontal) {
          const ratioWidthScroll = scrollWidth / clientWidth;
          let scrollLeft = Math.round((currentleftOfThumb + (e.clientX - currentClientX)) * ratioWidthScroll);
          this.scrollContainer.current.scrollLeft = scrollLeft;
        }
      }
    });
  }
  
  //onmouseup
  onDocumentMouseUp(){
    _document.addEventListener('mouseup', e => {
      if(this.scrollContainer.current) {
        _document.body.removeAttribute('style');
      }
      this.setState({
        isScrollVertical: false,
        isScrolHorizontal: false,
      });
    });
  }

  //onscroll
  onScroll(e) {
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    const scrollWidth = e.target.scrollWidth;
    const clientWidth = e.target.clientWidth;
    this.setState({
      thumbVertical: {
        height: clientHeight / (scrollHeight / clientHeight),
        top: (e.target.scrollTop / scrollHeight) * 100 + '%' ,
      },
      thumbHorizontal: {
        width: clientWidth / (scrollWidth / clientWidth),
        left: (e.target.scrollLeft / scrollWidth) * 100 + '%',
      },
    })
  }

  //onmousedown
  onMouseDown(e, type) {
    if (type === SCROLL_DIRECTION.VERTICAL) {
      this.setState({
        isScrollVertical: true,
        currentClientY: e.clientY,
        currentTopOfThumb: e.target.offsetTop,
      });
    } else if (type === SCROLL_DIRECTION.HORIZONTAL) {
      this.setState({
        isScrolHorizontal: true,
        currentClientX: e.clientX,
        currentleftOfThumb: e.target.offsetLeft,
      });
    }
  }

  render() {
    const {
      isActiveVerticalScroll,
      isActiveHorizontalScroll
    } = this.state;
    return (
      <div className={`scroll-bar-container ${this.props.className}`.trim()}>
        <div className="scroll-content" onScroll={this.onScroll} ref={this.scrollContainer}>
          <div className="content">
          {this.props.children}
          </div>
        </div>
       {isActiveVerticalScroll ? <div className="vertical-scroll">
          <div className="track">
            <div style={{
              height: this.state.thumbVertical.height,
              top: this.state.thumbVertical.top,
            }}
              className="thumb"
              onMouseDown={e => this.onMouseDown(e, SCROLL_DIRECTION.VERTICAL)}
            >
            </div>
          </div>
        </div> : null}
        { isActiveHorizontalScroll ? <div className="horizontal-scroll">
          <div className="track">
            <div style={{
              width: this.state.thumbHorizontal.width,
              left: this.state.thumbHorizontal.left,
            }} className="thumb"
              onMouseDown={e => this.onMouseDown(e, SCROLL_DIRECTION.HORIZONTAL)}
            >
            </div>
          </div>
        </div> : null }
      </div>
    );
  }
}

ScrollBar.propType = {
  children: PropTypes.shape({}),
  className: PropTypes.string,
};

ScrollBar.defaultProps = {
  children: null,
  className: '',
};

export default ScrollBar;
