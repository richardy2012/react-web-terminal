;(function() {
  $(document).ready(function() {
    var Output = React.createClass({
      render: function() {
        var rawMarkup = marked(this.props.text, {sanitize: true});
        return (
          <div className="output">
            <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
          </div>
        );
      }
    });

    var Terminal = React.createClass({
      getInitialState: function() {
        return {data: []}
      },
      handleInput: function(command) {
        var commands = this.state.data;
        commands.push(command);
        this.setState({data: commands});
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: command,
          success: function(data) {
            commands.push(data);
            this.setState({data: commands});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
      render: function() {
        return (
          <div className="terminal">
            <TerminalOutput data={this.state.data} />
            <TerminalInput onInput={this.handleInput} />
          </div>
        );
      }
    });

    var TerminalOutput = React.createClass({
      render: function() {
        var outputNodes = this.props.data.map(function(output, index) {
          return (
            <Output key={index} text={output.command} />
          );
        });
        return (
          <div className="TerminalOutput">
            {outputNodes}
          </div>
        );
      }
    });

    var TerminalInput = React.createClass({
      handleInput: function(e) {
        e.preventDefault();
        var command = React.findDOMNode(this.refs.command).value.trim();
        if(!command)
          return;
        this.props.onInput({command: command});
        React.findDOMNode(this.refs.command).value = '';
      },
      render: function() {
        return (
          <form className="terminalInput" onSubmit={this.handleInput}>
            <input type="text" placeholder="$ " ref="command" />
            <button type="submit" className="hideSubmit" />
          </form>
        );
      }
    });

    React.render(
      <Terminal url="/" />,
      document.getElementById('content')
    );
  });
}).call(this);