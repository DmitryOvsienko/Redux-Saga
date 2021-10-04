import React, {Component} from "react";

import './Table.scss'
import {connect} from "react-redux";
import {axiosGet, deleteData} from "../../redux/actions";

export interface axiosData {
  id: number,
  name: string,
  tagline: string,
  first_brewed: string,
  description: string,
  image_url: string,
  abv: number,
  ibu: number,
  ebc: number,
  srm: number,
  attenuation_level: number,
  volume: number,
  brewers_tips: string,
  contributed_by: string
}

type dataObj = {
  data: axiosData[],
  hover: boolean,
  id: number,
  changeText: boolean
}

type props = { //обозначаем типы пропсов
  axiosGet: typeof axiosGet,
  deleteData: typeof deleteData,
  data: {
    data: axiosData[]
  }
}

class Table extends Component<props, dataObj> {
  constructor(props: props) {
    super(props);
    this.state = {
      data: [{
        id: 0,
        name: '',
        tagline: '',
        first_brewed: '',
        description: '',
        image_url: '',
        abv: 0,
        ibu: 0,
        ebc: 0,
        srm: 0,
        attenuation_level: 0,
        volume: 0,
        brewers_tips: '',
        contributed_by: ''
      }],
      hover: false,
      id: 0,
      changeText: false,
    }

    this.hideButton = this.hideButton.bind(this)
    this.showButton = this.showButton.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.changeItem = this.changeItem.bind(this)
    this.handlerInput = this.handlerInput.bind(this)
  }

  cutText = (text: string): string => {
    const cut = text.slice(0, 10)
    return `${cut}...`
  }

  showButton(id: number): void {
    this.setState({
      hover: true,
      id
    })
  }

  hideButton(id: number): void {
    this.setState({
      hover: false,
      id,
      changeText: false
    })
  }

  deleteItem(id: number) {
    const newData = this.props.data.data.filter(item => item.id !== id)
    this.props.deleteData(newData)
  }

  changeItem(id: number) {
    this.setState({
      id,
      changeText: true
    })
  }

  handlerInput(event: any, id: any) {
    const {value} = event.target
    const newColumn = this.state.data.map((el: any) => {
      if (el.id === id) {
        return {
          ...el,
          name: value,
        }
      }
      return el
    })
    console.log('===>newColumn', newColumn);
    this.setState({data: newColumn})
  }

  componentDidMount (): void {
    this.props.axiosGet() //вызываем экшн для обработки сагой чтобы тайпскрипт не ругался нужно определить его тип
  }

  componentDidUpdate() {
    if (this.props.data.data !== this.state.data) {
      if (this.state.data.length === 1) {
        this.setState({
          data: this.props.data.data
        })
      }
    }
  }

  render() {
    return (
      <div className='table'>
        <div className='row main'>
          <div className='col'>
            name
          </div>
          <div className='col'>
            tagline
          </div>
          <div className='col'>
            first_brewed
          </div>
          <div className='col'>
            description
          </div>
          <div className='col'>
            image_url
          </div>
          <div className='col'>
            abv
          </div>
          <div className='col'>
            ibu
          </div>
          <div className='col'>
            ebc
          </div>
          <div className='col'>
            srm
          </div>
          <div className='col'>
            attenuation_level
          </div>
          <div className='col'>
            volume
          </div>
          <div className='col'>
            brewers_tips
          </div>
          <div className='col'>
            contributed_by
          </div>
        </div>
        {
          this.state.data.length > 1
            ?
            this.state.data.map((item: any) => (
              <div className='row'
                   key={item.id}
                   onMouseEnter={() => this.showButton(item.id)}
                   onMouseLeave={() => this.hideButton(item.id)}
              >
                <button
                  className={this.state.hover && item.id === this.state.id ? 'deleteItem show' : 'deleteItem'}
                  onClick={() => this.deleteItem(item.id)}
                >
                  Delete
                </button>
                <button
                  className={this.state.hover && item.id === this.state.id ? 'changeItem show' : 'changeItem'}
                  onClick={() => this.changeItem(item.id)}
                >
                  Change
                </button>
                <div className='col'>
                  {
                    this.state.id === item.id && this.state.changeText
                      ?
                      <div>
                        <input
                          style={{textAlign: "center"}}
                          type="text"
                          value={item.name}
                          onChange={(e) => this.handlerInput(e, item.id)}
                        />
                      </div>
                      :
                      item.name
                  }

                </div>
                <div className='col'>
                  {
                    this.cutText(item.tagline)
                  }
                </div>
                <div className='col'>
                  {item.first_brewed}
                </div>
                <div className='col'>
                  {
                    this.cutText(item.description)
                  }
                </div>
                <div className='col'>
                  <img src={item.image_url} alt='pic'/>
                </div>
                <div className='col'>
                  {item.abv}
                </div>
                <div className='col'>
                  {item.ibu}
                </div>
                <div className='col'>
                  {item.ebc}
                </div>
                <div className='col'>
                  {item.srm}
                </div>
                <div className='col'>
                  {item.attenuation_level}
                </div>
                <div className='col'>
                  {item.volume.value}
                </div>
                <div className='col'>
                  {
                    this.cutText(item.brewers_tips)
                  }
                </div>
                <div className='col'>
                  {
                    this.cutText(item.contributed_by)
                  }
                </div>
              </div>
            ))
            :
            <div className="loading">LOADING...</div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = { // наш экшн передаем его в диспатч
  axiosGet,
  deleteData
}

const mapStateToProps = (state: props) => ({ //стейт редакса
  data: state.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table) //первым параметром принимает стейт вторым экшн