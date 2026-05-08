async function main() {
  try {
    const response = await fetch('http://4.224.186.213/evaluation-service/depots',{
        method: 'GET',
        headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
        }
    }); 
    const depots = await response.json();
    for (const depot of depots) {
      const { depotId, mechanicHours, vehicles } = depot;
      const selected = knapsack(vehicles, mechanicHours);
      console.log(`Depot ${depotId}: Selected vehicles: ${selected.map(v => v.vehicleId).join(', ')}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function knapsack(tasks, capacity) {
  const n = tasks.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const { impactScore: score, serviceHours: duration } = tasks[i - 1];
    for (let w = 0; w <= capacity; w++) {
      if (duration <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - duration] + score);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  let w = capacity;
  const selected = [];
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(tasks[i - 1]);
      w -= tasks[i - 1].serviceHours;
    }
  }
  return selected.reverse();
}

main();