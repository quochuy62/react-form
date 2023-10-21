import React, { Component } from "react";
import { connect } from "react-redux";
// import { deleteCreator,editCreator } from "../../redux/reducer/creator";
class StudentInfor extends Component {
    render() {
        const { listStudent } = this.props;
        
        return (
          <div>
            <table className="table mt-4">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Mã SV</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {listStudent.map((student) => (
                  <tr key={student.id}>
                    <th scope="row">{student.Id}</th>
                    <td>{student.Name}</td>
                    <td>{student.Phone}</td>
                    <td>{student.Email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
    
    const mapStateToProps = (state) => {
      return {
        listStudent: state.listStudent,
      };
    };
    
    export default connect(mapStateToProps)(StudentInfor);