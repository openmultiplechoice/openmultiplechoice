<script>
    import { run, preventDefault } from 'svelte/legacy';

    import Chart from 'chart.js/auto';

    let { progressPercentage = $bindable(), sessionId } = $props();

    let canvas = $state();
    let chart = $state();

    run(() => {
        if (canvas) {
            (() => {
                if (chart) {
                    // The chart was drawn already and we don't expect the session
                    // to change after it was completed. Nothing to do, I guess?
                    return;
                }
                const config = {
                    type: 'doughnut',
                    data: {
                        labels: [
                            'Correct',
                            'Correct with help',
                            'Incorrect'
                        ],
                        datasets: [
                            {
                                label: '%',
                                data: [
                                    progressPercentage.correct,
                                    progressPercentage.correctWithHelp,
                                    progressPercentage.incorrect
                                ],
                                backgroundColor: [
                                    '#198754',
                                    '#ffc107',
                                    '#dc3545'
                                ],
                                hoverOffet: 4
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        hover: {
                            mode: null
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                };

                if (chart) {
                    chart.destroy();
                }
                var ctx = canvas.getContext('2d');
                chart = new Chart(ctx, config);
            })();
        }
    });;

    function createSession(sessionId) {
        axios
            .post('/api/sessions/' + sessionId + '/newfromincorrect')
            .then(function (response) {
                window.location.href = "/sessions/" + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<div class="row mb-5">
    <div class="col-md">
        <canvas bind:this={canvas}></canvas>
    </div>
    <div class="col-md">
        <p class="mt-3 text-dark">
            <span class="fs-4 font-monospace">{progressPercentage.correct}%</span> correct
        </p>

        <div class="d-grid gap-2">
            <a href="/sessions/create" class="btn btn-sm btn-primary">
                <i class="bi bi-rocket-takeoff"></i> New session</a>
            {#if progressPercentage.incorrect > 0}
                <button onclick={preventDefault(() => createSession(sessionId))}
                    class="btn btn-sm btn-outline-secondary" type="button">
                        <i class="bi bi-repeat"></i> Repeat incorrect
                </button>
            {/if}
            <a href="/" class="btn btn-sm btn-outline-secondary">Home</a>
        </div>
    </div>
</div>
