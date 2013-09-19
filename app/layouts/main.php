<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="assets/ico/favicon.png">

    <title>Starter Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="assets/js/html5shiv.js"></script>
      <script src="assets/js/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
    
    <div class="container" style="padding:50px 0">
        <div class="cart" style="border:1px solid #369; height:400px;">
            <div></div>
            <div class="actions">
                <a href="javascript:void()"> Task#1</a>
                <a href="javascript:void()"> Task#2</a>
                <a href="javascript:void()"> Task#3</a>
            </div>
        </div>
        
        <?php echo $content; ?>        
    </div>
    
    <div class="container" style="padding:50px 0">
        <?php echo $content; ?>        
    </div>    
    
    
    
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="assets/js/mootools-core-1.4.5.js"></script>
    <script src="assets/js/mootools-more-1.4.0.1.js"></script>
    <script src="assets/js/ContextMenu.js"></script>
    <script type="text/javascript">
        
        document.addEvent('domready', function() {            
            var tbl = $$(".table");
            
            new ContextMenu(tbl[0], {
                target : 'tbody > tr',
                onShow: function(evt, elem) {}
            });
            new ContextMenu(tbl[1], {
                target : 'tbody > tr',
                onShow: function(evt, elem) {}
            });
            
            new ContextMenu($$('.cart')[0], {                
                onShow: function(evt, elem) {}
            });

            tbl.addEvent('click:relay(a.delete)', function(evt, elem){
                alert("Delete item #"+elem.get('data-id'));
            });
            tbl.addEvent('click:relay(a.view)', function(evt, elem){
                alert("View item #"+elem.get('data-id'));
            });
        });
    </script>
  </body>
</html>
