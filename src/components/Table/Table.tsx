import {Component} from "react";

import './Table.scss'
import { connect } from "react-redux";
import { axiosGet } from "../../redux/actions";

type dataObj = {
  data: any[],
}

type props = {
  axiosGet: typeof axiosGet,
  data: {
    data: any[]
  }
}

class Table extends Component<props, dataObj> {
  constructor(props: props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount(): void {
    this.props.axiosGet()
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
          this.props.data.data.length 
          ?
          this.props.data.data.map((item: any) => (
            <div className='row' key={item.id}>
              <div className='col'>
                {item.name}
              </div>
              <div className='col'>
                {item.tagline}
              </div>
              <div className='col'>
                {item.first_brewed}
              </div>
              <div className='col'>
                {item.description}
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
                {item.brewers_tips}
              </div>
              <div className='col'>
                {item.contributed_by}
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
  axiosGet
}

const mapStateToProps = (state:any) => ({ //стейт редакса
  data: state.data,
});

export default connect(mapStateToProps,mapDispatchToProps)(Table) //первым параметром принимает стейт вторым экшн