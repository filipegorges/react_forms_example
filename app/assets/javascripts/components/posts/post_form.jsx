class PostForm extends BaseForm {

  constructor(props) {
    super(props);
    this.store = PostStore;
  }

  componentDidMount() {
    CategoryStore.getResources().then(data => {
      this.setState({
        loaded:     true,
        categories: data.categories
      });
    });
  }

  render() {
    if (!this.state.loaded) { return <div>Loading...</div>; }

    let destroyButton;
    if (this.props.resource.id) {
      destroyButton = <button className="btn btn-danger pull-right" onClick={this.handleDestroy}>Delete</button>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <SelectInput {...this.getInputProps('category_id')} options={this.state.categories} />
        <TextInput {...this.getInputProps('title')} autoFocus={true} />
        <TextareaInput {...this.getInputProps('body')} />
        <Link to='posts' className="btn btn-default">Cancel</Link>
        <button type="submit" className="btn btn-primary pull-right">Save</button>
        {destroyButton}
      </form>
    )
  }

}
