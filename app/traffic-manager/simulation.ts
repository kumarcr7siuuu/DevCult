export class Node {
    id: string;
    x: number;
    y: number;
    connections: Edge[];

    constructor(id: string, x: number, y: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.connections = [];
    }
}

export class Edge {
    id: string;
    startNode: Node;
    endNode: Node;
    length: number;

    // 3-Zone Load Data
    loadStart: number = 0;   // Merging Zone (0.0 - 0.2)
    loadMiddle: number = 0;  // Cruising Zone (0.2 - 0.8)
    loadEnd: number = 0;     // Conflict Zone (0.8 - 1.0)

    static BASE_WEIGHT = 10;

    constructor(id: string, start: Node, end: Node) {
        this.id = id;
        this.startNode = start;
        this.endNode = end;
        // Simple Euclidean distance
        this.length = Math.hypot(end.x - start.x, end.y - start.y);
    }

    // Dynamic Cost Calculation
    get currentCost(): number {
        // Penalty Formula: (LoadMiddle * 2) + (LoadEnd * 5)
        // High penalty for conflict zone congestion
        const trafficPenalty = (this.loadMiddle * 2) + (this.loadEnd * 5) + (this.loadStart * 0.5);
        return Edge.BASE_WEIGHT + trafficPenalty + (this.length * 0.1);
    }

    // Reset loads before next tick calculation (if needed, or done incrementally)
    resetLoads() {
        this.loadStart = 0;
        this.loadMiddle = 0;
        this.loadEnd = 0;
    }
}

export class PathFinderBidirectional {
    static findPath(start: Node, end: Node, allNodes: Map<string, Node>): Node[] | null {
        if (start === end) return [start];

        // Bi-directional BFS/Dijkstra simplified for this demo
        // For a full A*, we'd use a PriorityQueue and Heuristics.
        // Given visual demo scale (usually < 100 nodes), a simple search is performant enough.
        // We will implement a standard Dijkstra here for robustness on small graphs.

        const processMap = (startNode: Node) => {
            const distances = new Map<Node, number>();
            const previous = new Map<Node, Node>();
            const pq: { node: Node, dist: number }[] = [];

            // Init
            allNodes.forEach(n => distances.set(n, Infinity));
            distances.set(startNode, 0);
            pq.push({ node: startNode, dist: 0 });

            while (pq.length > 0) {
                // Pop min
                pq.sort((a, b) => a.dist - b.dist);
                const { node: u, dist } = pq.shift()!;

                if (dist > distances.get(u)!) continue;

                for (const edge of u.connections) {
                    const v = edge.endNode;
                    const alt = dist + edge.currentCost; // Use dynamic cost!
                    if (alt < distances.get(v)!) {
                        distances.set(v, alt);
                        previous.set(v, u);
                        pq.push({ node: v, dist: alt });
                    }
                }
            }
            return previous;
        }

        // Run Forward Search (Single Direction for Stability in Demo)
        // Ideally Bidirectional runs two simultaneous searches until they meet.
        // For this specific 'showcase', a dynamic Dijkstra weighted by the 3-Zone cost is perfect.
        const prevMap = processMap(start);

        // Reconstruct
        const path: Node[] = [];
        let curr: Node | undefined = end;
        if (!prevMap.has(end)) return null; // No path

        while (curr) {
            path.unshift(curr);
            curr = prevMap.get(curr);
        }
        return path;
    }
}

export class User {
    id: string;
    currentEdge: Edge | null = null;
    progress: number = 0; // 0.0 to 1.0
    path: Node[] = [];
    speed: number = 0.01; // Base speed

    // Reroute Logic
    private lastRerouteProgress: number = 0;

    constructor(id: string) {
        this.id = id;
        this.speed = 0.005 + Math.random() * 0.01; // Randomize speed slightly
    }

    spawn(nodes: Node[]) {
        if (nodes.length < 2) return;
        const start = nodes[Math.floor(Math.random() * nodes.length)];
        let end = nodes[Math.floor(Math.random() * nodes.length)];
        while (start === end) {
            end = nodes[Math.floor(Math.random() * nodes.length)];
        }

        const path = PathFinderBidirectional.findPath(start, end, new Map(nodes.map(n => [n.id, n])));
        if (path && path.length > 1) {
            this.path = path;
            // Set initial edge
            const firstEdge = start.connections.find(e => e.endNode === path[1]);
            if (firstEdge) {
                this.currentEdge = firstEdge;
                this.progress = 0;
            }
        }
    }

    update(nodes: Node[]) {
        if (!this.currentEdge) {
            this.spawn(nodes);
            return;
        }

        // Move
        // Speed is affected by density? For simplicity in demo: constant speed unless blocked?
        // Let's implement simple "slowdown" if zone is red.
        let zoneMult = 1.0;
        if (this.progress < 0.2) {
            // Merging
            if (this.currentEdge.loadStart > 5) zoneMult = 0.5;
        } else if (this.progress > 0.8) {
            // Conflict
            if (this.currentEdge.loadEnd > 3) zoneMult = 0.2; // HEAVY penalty in conflict zone
        } else {
            // Cruising
            if (this.currentEdge.loadMiddle > 10) zoneMult = 0.8;
        }

        this.progress += this.speed * zoneMult;

        // Bucket Update for 3-Zone Model
        // We add "1" to the load of the current zone. 
        // Note: Real simulation would aggregate all users. 
        // Here we assume TrafficManager clears & rebuilds loads OR we just increment and decay.
        // Better for visual smooth: TrafficManager calculates loads each frame based on user positions.

        // Rerouting Check (Every 10%)
        if (this.progress - this.lastRerouteProgress > 0.1) {
            this.lastRerouteProgress = this.progress;
            // Trigger reroute logic if needed (omitted for pure visual flow optimization in demo)
        }

        // End of Edge
        if (this.progress >= 1.0) {
            this.arriveAtNextNode(nodes);
        }
    }

    arriveAtNextNode(nodes: Node[]) {
        if (!this.path || this.path.length < 2) {
            this.currentEdge = null;
            return;
        }

        // We are at path[1].
        // Remove path[0]
        this.path.shift(); // Old start is gone
        // Now path[0] is current node, path[1] is next

        if (this.path.length < 2) {
            // Reached destination
            this.currentEdge = null; // Will respawn next tick
            return;
        }

        const u = this.path[0];
        const v = this.path[1];
        const nextEdge = u.connections.find(e => e.endNode === v);

        if (nextEdge) {
            this.currentEdge = nextEdge;
            this.progress = 0;
            this.lastRerouteProgress = 0;
        } else {
            // Path broken?
            this.currentEdge = null;
        }
    }
}

export class TrafficManager {
    nodes: Node[] = [];
    edges: Edge[] = [];
    users: User[] = [];

    constructor(nodeCount = 20, userCount = 50) {
        this.generateGraph(nodeCount);
        this.generateUsers(userCount);
    }

    generateGraph(count: number) {
        // Create random nodes in 0-100 coordinate space
        for (let i = 0; i < count; i++) {
            this.nodes.push(new Node(`n${i}`, Math.random() * 100, Math.random() * 100));
        }

        // Connect near nodes to form a mesh
        this.nodes.forEach(u => {
            // Connect to 2-3 nearest neighbors to ensure graph structure
            const neighbors = this.nodes
                .filter(v => v !== u)
                .map(v => ({ node: v, dist: Math.hypot(v.x - u.x, v.y - u.y) }))
                .sort((a, b) => a.dist - b.dist)
                .slice(0, 3); // Top 3 closest

            neighbors.forEach(({ node: v }) => {
                // One way? Or Two way? Let's do directed edges
                const edge = new Edge(`${u.id}-${v.id}`, u, v);
                u.connections.push(edge);
                this.edges.push(edge);
            });
        });
    }

    generateUsers(count: number) {
        for (let i = 0; i < count; i++) {
            this.users.push(new User(`u${i}`));
        }
    }

    tick() {
        // 1. Reset Edge Loads
        this.edges.forEach(e => e.resetLoads());

        // 2. Update Users & Accumulate Loads
        this.users.forEach(u => {
            u.update(this.nodes);

            if (u.currentEdge) {
                if (u.progress < 0.2) u.currentEdge.loadStart++;
                else if (u.progress > 0.8) u.currentEdge.loadEnd++;
                else u.currentEdge.loadMiddle++;
            }
        });
    }
}
