/* eslint-disable react/prop-types */
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpdateTask = ({task}) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {title, description, deadline, priority} = task;
    
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const priority = form.priority.value;
        const deadline = form.deadline.value;
        event.target.title.value = "";
        event.target.description.value = "";
        event.target.priority.value = "";
        event.target.deadline.value = "";
        const sorting = deadline.split("-").join("");
        // console.log(deadline.split("-").join(""));
        
        const updateData = {
            title, description, priority, deadline, email: user.email, sorting
        }
        console.log(updateData);
    }
    
    return (
        <div>
            <div>
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="email">Task Title</label>
                            <input defaultValue={title} className='input999' required name="title" id="email" type="text" />
                            <br />

                            <label htmlFor="email">Task Priority</label>

                            <select defaultValue={priority} className='input999' required name="priority">
                                <option value="" selected>Select Priority ?</option>
                                <option value="Low">Low</option>
                                <option value="moderate">moderate</option>
                                <option value="High">High</option>
                            </select>

                            <br />
                            <label htmlFor="email">Task Deadline</label>
                            <input defaultValue={deadline} className='input999' placeholder='dd/mm/yy' required="" name="deadline" id="email" type="date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="textarea">Task Description</label>
                            <textarea defaultValue={description} required cols="50" rows="10" id="textarea" name="description">          </textarea>
                        </div>
                        <button type="submit" className="form-submit-btn">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;