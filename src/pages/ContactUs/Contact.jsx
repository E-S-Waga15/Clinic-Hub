import React from 'react';

const Contact = () => {
  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <h1 className="text-center mb-5">Contact Us</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-start w-100">
                    Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Enter your name"
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-start w-100">
                    Email <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Enter your email"
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-start w-100">
                    Subject <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="subject" 
                    placeholder="Enter subject"
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-start w-100">
                    Message <span style={{ color: 'red' }}>*</span>
                  </label>
                  <textarea 
                    className="form-control" 
                    id="message" 
                    rows="5" 
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 