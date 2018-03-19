import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    // same as const meta = field.meta;, this is destructuring just to make code shorter
    // previously was all field.meta.whatever
    // The { touched, error } pulls off touched and error from meta object, example of
    // using desctructuring to access properties on nested objects
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
              // ternary op below: field.meta.touched is first evaluated
              // as T or F, if T everything on the left of : returns, if F then the right
        />
        <div className = "text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values);
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title for Post" //this label could be called whatever as
          // longs as its called the same in renderField (field.WHATEVER)
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>

      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> {title: asdf, categories: asdf, content: asdf};
  const errors = {};
  // Validate the input from 'values'
  if (!values.title) {
    // .title, .categories, .content are linked to the "name" property in the Field component, so they
    // must be the same if we want them to show an error
    errors.title = 'Enter a title please';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories!';
  }
  if (!values.content) {
    errors.content = 'Enter some content please!';
  }
  // If errors is empty the form is fine to submit
  // If errors has any properties redux-form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);