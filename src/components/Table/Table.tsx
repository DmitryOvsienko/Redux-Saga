import React, {Component} from "react";

import './Table.scss'
import {connect} from "react-redux";
import {axiosGet, changeItemAdd, deleteData} from "../../redux/actions";

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
  volume: {
    value: number
  },
  brewers_tips: string,
  contributed_by: string
}

type dataObj = {
  data: axiosData[],
  hover: boolean,
  id: number,
  changeText: boolean,
  flag: boolean,
  deleteFlag: boolean
}

type props = { //обозначаем типы пропсов
  axiosGet: typeof axiosGet,
  deleteData: typeof deleteData,
  changeItemAdd: typeof changeItemAdd,
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
        volume: {
          value: 0
        },
        brewers_tips: '',
        contributed_by: ''
      }],
      hover: false,
      id: 0,
      changeText: false,
      flag: false,
      deleteFlag: false
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

  showButton(id: number) {
    this.setState({
      hover: true,
      id
    })
  }

  hideButton(id: number) {
    this.setState({
      hover: false,
      id,
      changeText: false
    })
    this.props.changeItemAdd(this.state.data)
  }

  deleteItem(id: number) {
    const newData = this.state.data.filter(item => item.id !== id)
    this.props.deleteData(newData)
    this.setState({
      deleteFlag: true
    })
  }

  changeItem(id: number) {
    this.setState({
      id,
      changeText: true
    })
  }

  handlerInput(event: {target: HTMLInputElement;}, id: number) {
    const {value, name} = event.target
    const newColumn = this.state.data.map((el: axiosData) => {
      if (el.id === id) {
        return {
          ...el,
          [name]: value,
        }
      }
      return el
    })
    this.setState({data: newColumn})
  }


  componentDidMount() {
    this.props.axiosGet() //вызываем экшн для обработки сагой чтобы тайпскрипт не ругался нужно определить его тип
  }

  componentDidUpdate() {
    if (this.props.data.data.length && !this.state.flag) { /*при первом рендере*/
      this.setState({
        data: this.props.data.data,
        flag: true
      })
    }

    if (this.state.deleteFlag) { /*перерендер при удалении*/
      this.setState({
        data: this.props.data.data,
        deleteFlag: false
      })
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
            this.state.data.map((item: axiosData) => {
              return (
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
                            name='name'
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
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='tagline'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.tagline}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        item.tagline
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='first_brewed'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.first_brewed}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        item.first_brewed
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='description'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.description}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        this.cutText(item.description)
                    }
                  </div>
                  <div className='col'>
                    <img src={item.image_url} alt='pic'/>
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='abv'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.abv}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        item.abv
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='ibu'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.ibu}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        item.ibu
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='ebc'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.ebc}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        item.ebc
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='srm'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.srm}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        item.srm
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='attenuation_level'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.attenuation_level}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        item.attenuation_level
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='volume'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.volume.value}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        item.volume.value
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='brewers_tips'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.brewers_tips}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        this.cutText(item.brewers_tips)
                    }
                  </div>
                  <div className='col'>
                    {
                      this.state.id === item.id && this.state.changeText
                        ?
                        <div>
                          <input
                            name='contributed_by'
                            style={{textAlign: "center"}}
                            type="text"
                            value={item.contributed_by}
                            onChange={(e) => this.handlerInput(e, item.id)}
                          />
                        </div>
                        :
                        this.cutText(item.contributed_by)
                    }
                  </div>
                </div>
              )
            })
            :
            <div className="loading">LOADING...</div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = { // наш экшн передаем его в диспатч
  axiosGet,
  deleteData,
  changeItemAdd
}

const mapStateToProps = (state: props) => ({ //стейт редакса
  data: state.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table) //первым параметром принимает стейт вторым экшн