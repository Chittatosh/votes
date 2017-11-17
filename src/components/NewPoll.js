import React from 'react';

const NewPoll = () => {
  return ( 
    <form action="api/newpoll" method="POST" className="NewPoll px-4 py-3">
      <div className="form-group">
        <label htmlFor="title">Title of the Poll:</label>
        <input type="text" className="form-control" id="title" name="question" aria-describedby="Question" 
          placeholder="What's your favorite kind of cookie?" maxLength="100" required/>
      </div>
      <div className="form-group">
        <label htmlFor="options">Choices (separated by commas):</label>
        <input type="text" className="form-control" id="options" name="choices" aria-describedby="Choices" 
          placeholder="Chocolate Chip, Shortbread, Oatmeal Raisin, Ginger Snap, Peanut Butter" maxLength="100" required/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default NewPoll;