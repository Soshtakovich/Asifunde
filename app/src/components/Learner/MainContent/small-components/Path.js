import '../../CSS/Main-small-components-css/Path.css'

function Path({ content }) {

    return (
  
            <div class="path-content-header">
                <div class="path-left">
                    <h1>{content}</h1>
                    
                        <ul className="breadcrumb">
                            <li><a href="/">Asifunde</a></li>
                            
                            <li><a href="/" className="active">{content}</a></li>
                        </ul>

                </div>
            </div>



    );
}

export default Path;