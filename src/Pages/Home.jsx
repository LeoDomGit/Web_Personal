import React from 'react'

function Home() {
  return (
    <>
    <div className="container pt-5">
      <div className="row pt-5" >
        <div className="col-md-6">
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
          
            
        </div>
        <div className="col-md-6">

        </div>
      </div>
    </div>
    </>
  )
}

export default Home