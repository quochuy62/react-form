import React, { Component } from "react";
import { connect } from "react-redux";
import {submitCreator} from "../../redux/reducer/creator";
class StudentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: {
            Id: "",
            Name: "",
            Phone: "",
            Email: ""
          },
          error: {
            Id: "",
            Name: "",
            Phone: "",
            Email: ""
          },
          touch: {
            Id: false,
            Name: false,
            Phone: false,
            Email: false
          }
        };
      }
    
      handleValidate = () => {
        const newError = { ...this.state.error };
        const { value } = this.state;
    
        for (let prop in value) {
          switch (prop) {
            case "Phone": {
              newError[prop] = "";
              const REGEX_NUMBER = /^\d+$/;
              if (!REGEX_NUMBER.test(value[prop])) {
                newError[prop] = "Phải là số";
              }
              if (value[prop].length === 0) {
                newError[prop] = "Vui lòng nhập số điện thoại";
              }
              break;
            }
            case "Id": {
              newError[prop] = "";
              if (!(Number(value[prop]) <= 999 && Number(value[prop]) >= 1)) {
                newError[prop] = "Mã sinh viên phải nằm trong khoảng từ 1 đến 99";
              }
              const REGEX_NUMBER = /^\d+$/;
              if (!REGEX_NUMBER.test(value[prop])) {
                newError[prop] = "Vui lòng chỉ nhập số";
              }
              if (value[prop].length === 0) {
                newError[prop] = "Vui lòng nhập mã sinh viên";
              }
              break;
            }
            case "Email": {
              newError[prop] = "";
              const REGEX_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
              if (!REGEX_EMAIL.test(value[prop])) {
                newError[prop] = "Email không hợp lệ.";
              }
              if (value[prop].length === 0) {
                newError[prop] = "Vui lòng nhập Email";
              }
              break;
            }
            case "Name": {
              newError[prop] = "";
              if (value[prop].length === 0) {
                newError[prop] = "Vui lòng nhập tên";
              }
              break;
            }
            default:
              break;
          }
        }
    
        this.setState(prevState => ({
          ...prevState,
          error: newError
        }));
    
        return newError;
      };
    
      handleChange = event => {
        const { target } = event;
        const { value, name } = target;
    
        this.setState(prevState => ({
          ...prevState,
          value: {
            ...prevState.value,
            [name]: value
          }
        }));
    
        this.handleValidate();
      };
    
      handleBlur = event => {
        const { name } = event.target;
    
        this.setState(prevState => ({
          ...prevState,
          touch: {
            ...prevState.touch,
            [name]: true
          }
        }));
    
        this.handleValidate();
      };
    
      handleSubmit = event => {
        event.preventDefault();
        this.setState(prevState => ({
          ...prevState,
          touch: {
            ...prevState.touch,
            Id: true,
            Name: true,
            Phone: true,
            Email: true
          }
        }));
    
        const newError = this.handleValidate();
        const ready = Object.values(newError).every(i => i.length === 0);
        if (!ready) return;
    
        const action = submitCreator(this.state.value);
        this.props.dispatch(action);
        console.log(this.state.value);
      };
    
      render() {
        const { value, error, touch } = this.state;
    
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <h1 className="bg-dark text-light">Thông tin sinh viên</h1>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Mã SV</label>
                  <input
                    onChange={this.handleChange}
                    value={value.Id}
                    onBlur={this.handleBlur}
                    name="Id"
                    type="id"
                    className="form-control"
                    id="input_Id"
                  />
                  {touch.Id && error.Id && (
                    <p className="text-danger">{error.Id}</p>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label>Họ tên</label>
                  <input
                    onChange={this.handleChange}
                    value={value.Name}
                    onBlur={this.handleBlur}
                    name="Name"
                    type="Text"
                    className="form-control"
                    id="Name"
                  />
                  {touch.Name && error.Name && (
                    <p className="text-danger">{error.Name}</p>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Số điện thoại</label>
                  <input
                    onChange={this.handleChange}
                    value={value.Phone}
                    onBlur={this.handleBlur}
                    name="Phone"
                    type="text"
                    className="form-control"
                    id="Phone"
                  />
                  {touch.Phone && error.Phone && (
                    <p className="text-danger">{error.Phone}</p>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    onChange={this.handleChange}
                    value={value.Email}
                    onBlur={this.handleBlur}
                    name="Email"
                    type="text"
                    className="form-control"
                    id="Email"
                  />
                  {touch.Email && error.Email && (
                    <p className="text-danger">{error.Email}</p>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                Thêm sinh viên
              </button>
            </form>
          </div>
        );
      }
    }
    
    export default connect()(StudentDetails);