/* eslint-disable */
import React from 'react'

function Home() {
  return (
    <>
    <div className="container pt-5">
      <div className="row text-center pt-5" >
        <h4>Các dự án demo </h4>
        <p>Mời anh/ chị tham khảo </p>
      </div>
      <div className="row text-center pt-5 justify-content-center" >
        <div className="col-md-6">
          <a href='/vu-tru-phim'>
          <div class="card shadow ">
            <div class="card-body">
              <div className="row">
                <img className='img-fluid' style={{height:300,width:'auto',margin:'0px auto'}} src="https://i.ytimg.com/vi/HJOkFIxrUOo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpCvRBG29d4BnsIrY2HU9G8pNivw" alt="" />
              </div>
              <div className="row mt-3">
                <div className="col-md text-center">
                <a href='/vu-tru-phim' className='btn btn-primary' >Vũ trụ phim</a>
                </div>
              </div>
            </div>
          </div>
          </a>
            
        </div>
        <div className="col-md-6">
        <a href='/game'>

          <div class="card shadow ">
            <div class="card-body">
              <div className="row">
                <img className='img-fluid' style={{height:300,width:'auto',margin:'0px auto'}} src="https://i.ytimg.com/vi/spyxd5suVJQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCRGeqq5Bco0c9mrXMpVJLE0QEugQ" alt="" />
              </div>
              <div className="row mt-3">
                <div className="col-md text-center">
                <a href='/game' className='btn btn-primary' >Vũ trụ Game</a>
                </div>
              </div>
            </div>
          </div>
          </a>
            
        </div>
        <div className="col-md-6 mt-3 mb-5">
        <a href='https://frontend.trungthanhzone.com' target='_blank'>
          <div class="card shadow ">
            <div class="card-body">
              <div className="row">
                <img className='img-fluid' style={{height:300,width:'auto',margin:'0px auto'}} src="./img/ecoomerce.png" alt="" />
              </div>
              <div className="row mt-3">
                <div className="col-md text-center">
                <a href='https://frontend.trungthanhzone.com' className='btn btn-primary' target='_blank'>Đến website</a>
                </div>
              </div>
            </div>
          </div>
          </a>
            
        </div>
        <div className="col-md-6 mt-3 mb-5">
        <a href='https://news.trungthanhweb.com' target='_blank'>
          <div class="card shadow ">
            <div class="card-body">
              <div className="row">
                <img className='img-fluid' style={{height:300,width:'auto',margin:'0px auto'}} src="./img/news.png" alt="" />
              </div>
              <div className="row mt-3">
                <div className="col-md text-center">
                <a href='https://news.trungthanhweb.com' className='btn btn-primary' target='_blank'>Đến website</a>
                </div>
              </div>
            </div>
          </div>
          </a>
            
        </div>
        <div className="col-md-6 mt-3 mb-5">
        <a href='/ai' target='_blank'>
          <div class="card shadow ">
            <div class="card-body">
              <div className="row">
                <img className='img-fluid' style={{height:300,width:'auto',margin:'0px auto'}} src="https://kernel-technology.com/wp-content/uploads/2024/01/What-is-Artiificial-IntelligenceAI-1.webp" alt="" />
              </div>
              <div className="row mt-3">
                <div className="col-md text-center">
                <a href='/ai' className='btn btn-primary' target='_blank'>Đến website</a>
                </div>
              </div>
            </div>
          </div>
          </a>
            
        </div>
      </div>  
    </div>
    </>
  )
}

export default Home
