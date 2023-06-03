<script>
    import Chart from 'chart.js/auto';

    export let progressPercentage;

    let canvas;
    let chart;

    $: if (canvas) {
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
                                '#d4edda',
                                '#fff3cd',
                                '#f8d7da'
                            ],
                            hoverOffet: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            };

            if (chart) {
                chart.destroy();
            }
            var ctx = canvas.getContext('2d');
            chart = new Chart(ctx, config);
        })();
    };
</script>

<div class="row mb-5">
    <div class="col-md">
        <canvas bind:this={canvas}></canvas>
    </div>
    <div class="col-md">
        <p class="mt-3">
            <strong>{progressPercentage.correct}%</strong> correct -
            {#if progressPercentage.correct >= 90}
                Brain!
            {:else if progressPercentage.correct >= 80}
                Boom!
            {:else if progressPercentage.correct >= 70}
                Great!
            {:else if progressPercentage.correct >= 60}
                Well done!
            {:else}
                Next time!
            {/if}
        </p>

        <div class="d-grid gap-2">
            <a href="/sessions/create" class="btn btn-sm btn-primary">
                <i class="bi bi-ui-checks-grid"></i> New session</a>
            <a href="/" class="btn btn-sm btn-outline-secondary">Home</a>
        </div>
    </div>
</div>
