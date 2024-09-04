

function Path({ content }) {

    return (
  
            <div class="header">
                <div class="left">
                    <h1>{content}</h1>
                    <ul class="breadcrumb">
                        <li><a href="/">
                                Asifunde
                            </a></li>
                        /
                        <li><a href="/" class="active">{content}</a></li>
                    </ul>
                </div>
            </div>



    );
}

export default Path;