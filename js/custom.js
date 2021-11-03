$(document).ready(function () {
    $("#sidebarTrigger").click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass("show");
    });

    // Select all script
    $(':checkbox.selectall').on('click', function(){
        $(':checkbox[name="' + $(this).data('checkbox-name') + '"]').prop("checked", $(this).prop("checked"));
    });
    $(':checkbox.checkme').on('click', function(){
    var _selectall = $(this).prop("checked");
        if ( _selectall ) {
          $( ':checkbox[name="' + $(this).attr('name') + '"]' ).each(function(i){
            _selectall = $(this).prop("checked");
            return _selectall;
          });
        }
        $(':checkbox[name="' + $(this).data('select-all') + '"]').prop("checked", _selectall);
    });

    // Card tabs
    $('.dashboard-card-box .nav-tabs').on('click', 'a', function(e){
    e.preventDefault();
      var tab  = $(this).parent(),
          tabIndex = tab.index(),
          tabPanel = $(this).closest('.dashboard-card-box'),
          tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
      tabPanel.find('.active').removeClass('active');
      tab.addClass('active');
      tabPane.addClass('active');
    });

    if($(".chart").length > 0) {
        // get column chart canvas
        var chart1 = document.getElementById('example_chart1').getContext('2d');
        // column chart data
        var chart1_data = new Chart(chart1, {
            responsive: true,
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Test',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var chart2 = document.getElementById('example_chart2').getContext('2d');
        var chart2_data = new Chart(chart2, {
            responsive: true,
            type: 'line',
            data: {
                labels: ["Feb 2020", "Mar 2020", "Apr 2020", "May 2020"],
                datasets: [{
                    label: "Test2",
                    backgroundColor: 'lightblue',
                    borderColor: 'royalblue',
                    data: [5, 7, 30, 35],
                }]
            },

            options: {
                legend: {
                    position: 'top'
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Precipitation in mm'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Month of the Year'
                        }
                    }]
                }
            }
        });
    }

});