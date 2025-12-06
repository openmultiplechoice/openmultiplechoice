<script>
    import { run, preventDefault } from 'svelte/legacy';

    import { onMount, onDestroy } from "svelte";
    import { createSession } from "./NewSessionHelper.js";

    import Chart from 'chart.js/auto';
    import { format, parseISO } from "date-fns";

    let canvasAnswers = $state();
    let chart = $state();
    let statsUpdateInterval;
    let statsLastUpdatedAt = $state();
    let statsAnswersByHour = $state({});
    let statsUsersByHour = $state({});
    let statsDecksNew = $state(undefined);
    let statsDecksPopular = $state(undefined);
    let statsDecksPopularTimespan = $state(0);
    let statsDecksLastUsed = $state(undefined);

    onMount(() => {
        loadStats();
        statsUpdateInterval = setInterval(loadStats, 2 * 60 * 1000 /* every 2 minutes */);
    });

    onDestroy(() => {
        clearInterval(statsUpdateInterval);
    });

    function loadStats() {
        axios
            .get("/api/stats/activity")
            .then(function (response) {
                const stats = response.data;

                statsAnswersByHour = stats.answers_byhour;
                statsUsersByHour = stats.users_byhour;
                statsDecksNew = stats.decks_new;
                statsDecksPopular = stats.decks_popular;
                statsDecksPopularTimespan = stats.decks_popular_timespan;
                statsDecksLastUsed = stats.decks_last_used

                statsLastUpdatedAt = new Date();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    run(() => {
        if (canvasAnswers && statsAnswersByHour && statsUsersByHour) {
            (() => {
                const labels = Object.keys(statsAnswersByHour);
                const dataset = Object.values(statsAnswersByHour);

                const sum = dataset.reduce((a, b) => a + b, 0);
                if (sum === 0) {
                    // No data to display
                    document.getElementById('stats').style.display = 'none';
                    return;
                }

                document.getElementById('stats').style.display = 'block';

                const config = {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Answers',
                                data: dataset,
                                backgroundColor: 'rgba(255, 205, 86, 0.4)',
                                borderColor: 'rgba(255, 205, 86, 0.4)',
                                fill: true,
                                showLine: false,
                                pointRadius: 0,
                                tension: 0.2,
                            },
                            {
                                label: 'Users',
                                data: Object.values(statsUsersByHour),
                                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                                borderColor: 'rgba(54, 162, 235, 0.7)',
                                fill: true,
                                showLine: false,
                                pointRadius: 0,
                                tension: 0.2,
                            }
                        ]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    title: function (context) {
                                        return format(parseISO(context[0].label), "dd.MM.yyyy HH:mm")
                                    }
                                }
                            }
                        },
                        responsive: true,
                        interaction: {
                            intersect: false,
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: false,
                                    text: 'Hour of the day',
                                },
                                ticks: {
                                    autoSkip: true,
                                    // Depending on the number of days,
                                    // we might want to display less or
                                    // more ticks
                                    maxTicksLimit: 3,
                                    callback: function (value) {
                                        const label = this.getLabelForValue(value);
                                        return format(label, "dd.MM.yyyy");
                                    }
                                },
                                grid: {
                                    display: false
                                },
                                border: {
                                    display: false
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: false,
                                    text: 'Number of answers',
                                },
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                    maxTicksLimit: 3,
                                    autoSkip: true
                                },
                                border: {
                                    display: false
                                }
                            }
                        }
                    }
                };

                if (chart) {
                    chart.destroy();
                }
                var ctx = canvasAnswers.getContext('2d');
                chart = new Chart(ctx, config);
            })();
        }
    });;
</script>

<div class="row">
    <div class="col-md">
        <h4>Stats</h4>
    </div>
</div>

{#if statsDecksNew && statsDecksPopular && statsDecksLastUsed
    && (statsDecksNew.length > 0 || statsDecksPopular.length > 0 || statsDecksLastUsed.length > 0)}

    <div class="row">
        {#if statsDecksNew.length > 0}
            <div class="col-lg mt-3 text-truncate">
                <h6>New decks</h6>
                {#each statsDecksNew as deck}
                    <div class="alert alert-light mx-1 my-2 p-1 text-truncate small" role="alert">
                        {#if deck.questions.length > 0}
                            <span class="badge text-bg-light font-monospace" title="Number of questions"><i class="bi bi-collection"></i> {@html deck.questions.length.toString().padEnd(3, ' ').replace(/ /g, '&nbsp;')}</span>
                        {/if}
                        <button onclick={preventDefault(() => createSession(deck.id))}
                            type="button" class="btn btn-sm btn-primary">
                                <i class="bi bi-rocket-takeoff"></i>
                        </button>
                        <a href="/decks/{deck.id}" class="alert-link text-decoration-none">{deck.name}</a>
                    </div>
                {/each}
            </div>
        {/if}
        {#if statsDecksPopular.length > 0 && statsDecksPopularTimespan}
            <div class="col-lg mt-3 text-truncate">
                <h6>Popular decks (last {statsDecksPopularTimespan} days)</h6>
                {#each statsDecksPopular as deck}
                    <div class="alert alert-light mx-1 my-2 p-1 text-truncate small" role="alert">
                        {#if deck.questions.length > 0}
                            <span class="badge text-bg-light font-monospace" title="Number of questions"><i class="bi bi-collection"></i> {@html deck.questions.length.toString().padEnd(3, ' ').replace(/ /g, '&nbsp;')}</span>
                        {/if}
                        {#if deck.sessions_count}
                            <span class="badge text-bg-light font-monospace" title="Number of sessions"><i class="bi bi-rocket"></i> {@html deck.sessions_count.toString().padEnd(3, ' ').replace(/ /g, '&nbsp;')}</span>
                        {/if}
                        <button onclick={preventDefault(() => createSession(deck.id))}
                            type="button" class="btn btn-sm btn-primary">
                                <i class="bi bi-rocket-takeoff"></i>
                        </button>
                        <a href="/decks/{deck.id}" class="alert-link text-decoration-none">{deck.name}</a>
                    </div>
                {/each}
            </div>
        {/if}
        {#if statsDecksLastUsed.length > 0}
            <div class="col-lg mt-3 text-truncate">
                <h6>Last used decks</h6>
                {#each statsDecksLastUsed as deck}
                    <div class="alert alert-light mx-1 my-2 p-1 text-truncate small" role="alert">
                        {#if deck.questions.length > 0}
                            <span class="badge text-bg-light font-monospace" title="Number of questions"><i class="bi bi-collection"></i> {@html deck.questions.length.toString().padEnd(3, ' ').replace(/ /g, '&nbsp;')}</span>
                        {/if}
                        <button onclick={preventDefault(() => createSession(deck.id))}
                                type="button" class="btn btn-sm btn-primary">
                            <i class="bi bi-rocket-takeoff"></i>
                        </button>
                        <a href="/decks/{deck.id}" class="alert-link text-decoration-none">{deck.name}</a>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
{:else if !statsDecksNew && !statsDecksPopular && !statsDecksLastUsed}
    <div class="d-flex justify-content-center mt-3 mb-3">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading stats ...</span>
        </div>
    </div>
{:else}
    <div class="alert alert-light text-center" role="alert">
        <i class="bi bi-cone-striped"></i> No stats available yet
    </div>
{/if}

<div id="stats" class="row mt-3 p-3">
    <div class="col-md">
        <canvas bind:this={canvasAnswers} style="max-height: 300px;"></canvas>
    </div>
</div>

<div class="row">
    <div class="col-md">
        <span class="badge text-bg-light text-muted">Last updated: {statsLastUpdatedAt ? format(statsLastUpdatedAt, "HH:mm") : "unknown"}</span>
    </div>
</div>
