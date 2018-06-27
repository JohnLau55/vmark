from sanic import Sanic
from sanic.response import text

app = Sanic()

@app.route("/")
async def test(request):
    return text('Hello World!')

def main():
    app.run(host="0.0.0.0", port=8000)

if __name__ == '__main__':
    main()