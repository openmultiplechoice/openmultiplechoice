<script>
    import { onMount } from "svelte";

    import Chart from 'chart.js/auto';
    import { format } from "date-fns";

    let canvasAnswers;
    let chart;
    let statsAnswersByHour = [];
    let statsDecksNew = [];
    let statsDecksPopular = [];

    onMount(() => {
        axios
            .get("/api/stats/answers/byhour")
            .then(function (response) {
                statsAnswersByHour = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .get("/api/stats/decks/new")
            .then(function (response) {
                statsDecksNew = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("/api/stats/decks/popular")
            .then(function (response) {
                statsDecksPopular = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    function createSession(deckId) {
        var data = {
            deck_id: deckId,
        };
        axios
            .post("/api/sessions", data)
            .then(function (response) {
                window.location.href = "/sessions/" + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    $: if (canvasAnswers) {
        (() => {
            const labels = Object.keys(statsAnswersByHour);
            const dataset = Object.values(statsAnswersByHour);

            const sum = dataset.reduce((a, b) => a + b, 0);
            if (sum === 0) {
                // No data to display
                return;
            }

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
                    ]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
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
                                maxTicksLimit: 5,
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
    };
</script>

<div class="row mt-3">
    {#if statsDecksNew.length > 0}
        <div class="col-md-6">
            <h6>New decks</h6>
            {#each statsDecksNew as deck}
                <div class="alert alert-light m-1 p-2 text-overflow" role="alert">
                    {#if deck.questions.length > 0}
                        <span class="badge text-bg-light" title="Number of questions"><i class="bi bi-collection" /> {deck.questions.length}</span>
                    {/if}
                    <button on:click|preventDefault={() => createSession(deck.id)}
                        type="button" class="btn btn-sm btn-primary">
                            <i class="bi bi-rocket-takeoff" />
                    </button>
                    <a href="/decks/{deck.id}" class="alert-link text-overflow">{deck.name}</a>
                </div>
            {/each}
        </div>
    {/if}
    {#if statsDecksPopular.length > 0}
        <div class="col-md-6">
            <h6>Popular decks</h6>
            {#each statsDecksPopular as deck}
                <div class="alert alert-light m-1 p-2 text-overflow" role="alert">
                    {#if deck.questions.length > 0}
                        <span class="badge text-bg-light" title="Number of questions"><i class="bi bi-collection" /> {deck.questions.length}</span>
                    {/if}
                    {#if deck.sessions.length > 0}
                        <span class="badge text-bg-light" title="Number of sessions"><i class="bi bi-rocket" /> {deck.sessions.length}</span>
                    {/if}
                    <button on:click|preventDefault={() => createSession(deck.id)}
                        type="button" class="btn btn-sm btn-primary">
                            <i class="bi bi-rocket-takeoff" />
                    </button>
                    <a href="/decks/{deck.id}" class="alert-link">{deck.name}</a>
                </div>
            {/each}
        </div>
    {/if}
</div>

<div class="row mt-3 p-3">
    <div class="col-md">
        <canvas bind:this={canvasAnswers} style="max-height: 300px;"></canvas>
    </div>
</div>

<style>
    .text-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
