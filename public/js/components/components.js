;(function() {
  $(document).ready(function() {
    var Output = React.createClass({displayName: "Output",
      render: function() {
        var rawMarkup = marked(this.props.text, {sanitize: true});
        return (
          React.createElement("div", {className: "output"}, 
            React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
          )
        );
      }
    });

    var Terminal = React.createClass({displayName: "Terminal",
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
          React.createElement("div", {className: "terminal"}, 
            React.createElement(TerminalOutput, {data: this.state.data}), 
            React.createElement(TerminalInput, {onInput: this.handleInput})
          )
        );
      }
    });

    var TerminalOutput = React.createClass({displayName: "TerminalOutput",
      render: function() {
        var outputNodes = this.props.data.map(function(output, index) {
          return (
            React.createElement(Output, {key: index, text: output.command})
          );
        });
        return (
          React.createElement("div", {className: "TerminalOutput"}, 
            outputNodes
          )
        );
      }
    });

    var TerminalInput = React.createClass({displayName: "TerminalInput",
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
          React.createElement("form", {className: "terminalInput", onSubmit: this.handleInput}, 
            React.createElement("input", {type: "text", placeholder: "$ ", ref: "command"}), 
            React.createElement("button", {type: "submit", className: "hideSubmit"})
          )
        );
      }
    });

    React.render(
      React.createElement(Terminal, {url: "/"}),
      document.getElementById('content')
    );
  });
}).call(this);
