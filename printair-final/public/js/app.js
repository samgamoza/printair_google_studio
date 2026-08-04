const App = {
    state: { role: 'customer', step: 1, user: null },
    
    init() { this.render(); },

    render() {
        const root = document.getElementById('app-root');
        const s = this.state;

        if (!s.user) return this.viewAuth(root);
        if (s.role === 'partner') return this.viewPartner(root);
        return this.viewCustomer(root);
    },

    viewAuth(root) {
        root.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div class="bg-white p-12 rounded-[40px] shadow-2xl w-full max-w-md text-center">
                    <h2 class="text-4xl font-bold mb-8">PrintAir</h2>
                    <button onclick="App.login('customer')" class="w-full bg-blue-600 text-white p-5 rounded-2xl font-bold mb-4">I want to Order Print</button>
                    <button onclick="App.login('partner')" class="w-full bg-gray-900 text-white p-5 rounded-2xl font-bold">I am a Printer</button>
                </div>
            </div>`;
    },

    login(role) { 
        this.state.user = { name: "User" }; 
        this.state.role = role; 
        this.render(); 
    },

    viewCustomer(root) {
        root.innerHTML = `
            <div class="p-16">
                <h1 class="text-6xl font-bold mb-10 tracking-tighter">Start a Project</h1>
                <div class="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 max-w-2xl">
                    <input id="title" placeholder="What are you making?" class="w-full p-6 bg-gray-50 rounded-2xl mb-4 text-xl outline-none">
                    <button onclick="App.post()" class="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold">Post Project</button>
                </div>
            </div>`;
    },

    viewPartner(root) {
        root.innerHTML = `<div class="p-16"><h1 class="text-6xl font-bold tracking-tighter">Opportunity Feed</h1><div id="feed" class="mt-10"></div></div>`;
        this.loadFeed();
    },

    async loadFeed() {
        const res = await fetch('/api/projects');
        const data = await res.json();
        document.getElementById('feed').innerHTML = data.map(p => `
            <div class="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
                <h3 class="text-2xl font-bold">${p.title}</h3>
                <button class="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold">Quote Now</button>
            </div>`).join('');
    },

    async post() {
        const title = document.getElementById('title').value;
        await fetch('/api/projects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, quantity: '500', category: 'General' })
        });
        alert('Live!');
        this.render();
    }
};
App.init();