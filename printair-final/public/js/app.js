const App = {
    state: { screen: 'landing' },
    
    init() { this.render(); },

    async render() {
        const root = document.getElementById('app-root');
        if (this.state.screen === 'landing') {
            root.innerHTML = `
                <div class="p-20 text-center">
                    <h1 class="text-7xl font-bold mb-10 tracking-tight">Printing, simplified.</h1>
                    <button onclick="App.setState('builder')" class="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold">Start Project</button>
                    <button onclick="App.setState('feed')" class="ml-4 text-gray-400 font-bold">Partner Mode</button>
                </div>`;
        } else if (this.state.screen === 'builder') {
            root.innerHTML = `
                <div class="max-w-xl mx-auto p-20">
                    <h2 class="text-3xl font-bold mb-8">New Project</h2>
                    <input id="title" placeholder="Project Name" class="w-full p-5 border rounded-2xl mb-4">
                    <button onclick="App.save()" class="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold">Post Project</button>
                </div>`;
        } else if (this.state.screen === 'feed') {
            const res = await fetch('/api/projects');
            const data = await res.json();
            root.innerHTML = `
                <div class="max-w-2xl mx-auto p-20">
                    <h2 class="text-3xl font-bold mb-10">Opportunity Feed</h2>
                    <div class="space-y-4">${data.map(p => `<div class="p-8 bg-white border rounded-[2rem] flex justify-between"><span>${p.title}</span><button class="font-bold text-blue-600">Quote</button></div>`).join('')}</div>
                </div>`;
        }
    },

    setState(screen) { this.state.screen = screen; this.render(); },

    async save() {
        const title = document.getElementById('title').value;
        await fetch('/api/projects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, quantity: '500' })
        });
        this.setState('feed');
    }
};
App.init();