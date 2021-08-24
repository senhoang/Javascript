export default function html([first, ...strings], ...values) { // Hàm này gọi là template engine, hàm này xử lí một số lỗi linh tinh của html thôi
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0) 
    .join('')
}

export function createStore(reducer) { // Ham này tạo ra dữ liệu trong store thông qua reducer và các thao tác trên view
    let state = reducer()
    const roots = new Map()

    function render() { // render ra view
        for (const [root, component] of roots) {
            // console.log(component)
            const output = component()  
            root.innerHTML = output
        }
    }

    return {
        // Hàm này nhận mấy cái dòng HTML của component để hiển thị ra view
        attach(component, root) {
            roots.set(root, component) // doi voi obj thuong thi gan luon, nhung voi Map thi dung phuon thuc set
            render()
        },

        connect(selector = state => state) {
            // props và args là một obj, nó là các key: value mà ta muốn đưa thêm vào store và đưa ra view
            return component => (props, ...args) =>
            component(Object.assign({}, props, selector(state), ...args))
        },
        
        // Hàm này có tác dụng gửi thông tin đến reducer để xử lí dư liệu trong store và cả render ra view
        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render()
        }
    }
}
