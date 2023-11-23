import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import Navbar from './Navbar.js';
import { useLocation } from 'react-router-dom';
import professorInfo from './ProfessorSample.json';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include the CSS for the WYSIWYG editor
import Quill from 'quill';
import QuillHtmlEditButton from 'quill-html-edit-button';
import '../styles/singleprof.css'
const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGINATION = 8;

Quill.register('modules/htmlEditButton', QuillHtmlEditButton);

function findProfessorByName(name) {
    return professorInfo.find(prof => prof.Name === name);
}


function SingleProf() {
  const location = useLocation();
  const [professor, setProfessor] = useState(null); // Moved useState to the top
  const [editorContent, setEditorContent] = useState('');
  const joinArrayOrReturnNull = (array) => {
    return Array.isArray(array) ? array.join(', ') : null;
  };


  const [mathFieldLatex, setMathFieldLatex] = useState('');
  const modules = {
        toolbar: [
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            [{ 'script': 'sub'}, { 'script': 'super' }], 
            [{ 'direction': 'rtl' }], 
            ['clean'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
        ],
        clipboard: {
            // Match visual, not literal, whitespace
            matchVisual: false,
        },
        htmlEditButton: {}
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video','script','direction','color','background','align'
    ];
  const profKey = location.state && location.state.prof;



  if (!profKey || !findProfessorByName(profKey)) {
    const profdt = professorInfo[0]

    return (<div className='SingleProf'>

      <div className="site-mobile-menu">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icofont-close js-menu-toggle"></span>
          </div>
        </div>

        <div className="site-mobile-menu-body"></div>
        </div>

        <Navbar/>

        <div className="untree_co-hero overlay">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-12">
                <div className="row justify-content-center ">
                  <div className="col-lg-6 text-center ">
                    <h1 className="mb-4 heading text-white" data-aos="fade-up" data-aos-delay="100">Professors</h1>
                    <div className="mb-5 text-white desc mx-auto" data-aos="fade-up" data-aos-delay="200">
                      <p>Professors </p>
                      <p>All @ Emory</p>
                    </div>
                    <p className="mb-0" data-aos="fade-up" data-aos-delay="300">
                      <a href="#News_concrete" className="btn btn-secondary">Explore instructors</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


         <div className="untree_co-section">


        <div className="container">
      <div className="row">
        <div className="col-lg-5 mr-auto mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="0">
          <img src={profdt.Image && profdt.Image.length > 0 ? profdt.Image : null} alt="profile" className="img-fluid" style={{ width: '40%', height: 'auto' }} />
        </div>
        <div>
          <p>{profdt.Title && profdt.Name ? `${profdt.Title} ${profdt.Name}` : null}</p>
          <p>{profdt.PopupInfo ? `${profdt.PopupInfo} ` : null} </p>
          <div>
      <div className="text-editor">
        <ReactQuill
          theme="snow"
          value = {editorContent}
          modules={modules}
          formats={formats}
        />
      </div>
        </div>
      </div>
    </div>
      </div>

            
//////////////

    </div>






        <div className="untree_co-section bg-light" id = "News_concrete">

        <div className="site-footer">
          <div className="container">
            <div className="row">

              <div className="col-lg-3 mr-auto">
                <div className="widget">
                  <h3>About Us<span className="text-primary">.</span> </h3>
                    <p></p>
                </div>

                <div className="widget">
                  <h3>Connect</h3>
                  <ul className="list-unstyled social">
                        <li><Link to={'/'}><span className="icon-instagram"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-twitter"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-facebook"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-linkedin"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-pinterest"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-dribbble"></span></Link></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 ml-auto">
                <div className="widget">
                  <h3>Projects</h3>
                  <ul className="list-unstyled float-left links">
                        <li><Link to={'/'}>Web Design</Link></li>
                        <li><Link to={'/'}>HTML5</Link></li>
                        <li><Link to={'/'}>CSS3</Link></li>
                        <li><Link to={'/'}>jQuery</Link></li>
                        <li><Link to={'/'}>Bootstrap</Link></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="widget">
                  <h3>Gallery</h3>
                  <ul className="instafeed instagram-gallery list-unstyled">
                        <li><a className="instagram-item" href="images/gal_1.jpg" data-fancybox="gal"><img src="images/gal_1.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_2.jpg" data-fancybox="gal"><img src="images/gal_2.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_3.jpg" data-fancybox="gal"><img src="images/gal_3.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_4.jpg" data-fancybox="gal"><img src="images/gal_4.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_5.jpg" data-fancybox="gal"><img src="images/gal_5.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_6.jpg" data-fancybox="gal"><img src="images/gal_6.jpg" alt="" width="72" height="72"/></a>
                        </li>
                  </ul>
                </div>
              </div>


              <div className="col-lg-3">
                <div className="widget">
                  <h3>Contact</h3>
                  <address>201 Dowman Dr, Atlanta, GA 30322</address>
                  <ul className="list-unstyled links mb-4">
                      <li><a href="tel://4047276123">+1(404) 727-6123</a></li>
                      <li><a href="email://jeff.epstein@emory.edu">jeff.epstein@emory.edu</a></li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="row mt-5">
              <div className="col-12 text-center">
                <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }






  const profdt = findProfessorByName(profKey);



  

  return (
    <div className='SingleProf'>

      <div className="site-mobile-menu">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icofont-close js-menu-toggle"></span>
          </div>
        </div>

        <div className="site-mobile-menu-body"></div>
        </div>

        <Navbar/>

        <div className="untree_co-hero overlay">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-12">
                <div className="row justify-content-center ">
                  <div className="col-lg-6 text-center ">
                    <h1 className="mb-4 heading text-white" data-aos="fade-up" data-aos-delay="100">Professors</h1>
                    <div className="mb-5 text-white desc mx-auto" data-aos="fade-up" data-aos-delay="200">
                      <p>Professors </p>
                      <p>All @ Emory</p>
                    </div>
                    <p className="mb-0" data-aos="fade-up" data-aos-delay="300">
                      <a href="#News_concrete" className="btn btn-secondary">Explore instructors</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


         <div className="untree_co-section">


<div className="container">
      <div className="row">
        <div className="col-lg-5 mr-auto mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="0">
          <img src={profdt.Image && profdt.Image.length > 0 ? profdt.Image : null} alt="profile" className="img-fluid" style={{ width: '40%', height: 'auto' }} />
        </div>
        <div className = 'ProfessorIntroduction'>
          <p>{profdt.Title && profdt.Name ? `${profdt.Title} ${profdt.Name}` : null}</p>
        </div>
      </div>
    </div>
      </div>





      <div>
      <div className="text-editor">
        <ReactQuill
          theme="snow"
          value = {profdt.PopupInfo}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
      </div>


    </div>

        <div className="untree_co-section bg-light" id = "News_concrete">

        <div className="site-footer">
          <div className="container">
            <div className="row">

              <div className="col-lg-3 mr-auto">
                <div className="widget">
                  <h3>About Us<span className="text-primary">.</span> </h3>
                    <p></p>
                </div>

                <div className="widget">
                  <h3>Connect</h3>
                  <ul className="list-unstyled social">
                        <li><Link to={'/'}><span className="icon-instagram"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-twitter"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-facebook"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-linkedin"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-pinterest"></span></Link></li>
                        <li><Link to={'/'}><span className="icon-dribbble"></span></Link></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 ml-auto">
                <div className="widget">
                  <h3>Projects</h3>
                  <ul className="list-unstyled float-left links">
                        <li><Link to={'/'}>Web Design</Link></li>
                        <li><Link to={'/'}>HTML5</Link></li>
                        <li><Link to={'/'}>CSS3</Link></li>
                        <li><Link to={'/'}>jQuery</Link></li>
                        <li><Link to={'/'}>Bootstrap</Link></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="widget">
                  <h3>Gallery</h3>
                  <ul className="instafeed instagram-gallery list-unstyled">
                        <li><a className="instagram-item" href="images/gal_1.jpg" data-fancybox="gal"><img src="images/gal_1.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_2.jpg" data-fancybox="gal"><img src="images/gal_2.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_3.jpg" data-fancybox="gal"><img src="images/gal_3.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_4.jpg" data-fancybox="gal"><img src="images/gal_4.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_5.jpg" data-fancybox="gal"><img src="images/gal_5.jpg" alt="" width="72" height="72"/></a>
                        </li>
                        <li><a className="instagram-item" href="images/gal_6.jpg" data-fancybox="gal"><img src="images/gal_6.jpg" alt="" width="72" height="72"/></a>
                        </li>
                  </ul>
                </div>
              </div>


              <div className="col-lg-3">
                <div className="widget">
                  <h3>Contact</h3>
                  <address>201 Dowman Dr, Atlanta, GA 30322</address>
                  <ul className="list-unstyled links mb-4">
                      <li><a href="tel://4047276123">+1(404) 727-6123</a></li>
                      <li><a href="email://jeff.epstein@emory.edu">jeff.epstein@emory.edu</a></li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="row mt-5">
              <div className="col-12 text-center">
                <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProf;
