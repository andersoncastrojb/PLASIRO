from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/info_monitor', methods=['GET','POST'])
def info_monitor():
    return render_template('info_monitor.html')

if __name__ == '__main__':
    app.run()