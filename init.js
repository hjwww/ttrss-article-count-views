// overwrite cdmExpandArticle
// based on auto_embed_original by 
(
function(cdmExpandArticle) {
  // Do nothing if the user is forcing the expanded view
  if (getInitParam("cdm_expanded")) return;

  var oldExpandArticle = cdmExpandArticle;

  function __cdmExpandArticle(aId, noexpand) {
    var titleId = "RTITLE-" + aId;
    if(typeof($("RROW-" + aId)) !== 'undefined' && $("RROW-" + aId) != null) {
        var wasActive = $("RROW-" + aId).hasClassName("active");
	} else { 
		return;
	}

    var ret = oldExpandArticle.call(null, aId, noexpand);

	if (wasActive) {
        // closing window
    } else {
        // opening window
		var query = "op=pluginhandler&plugin=article_count_views&method=addView&id=" 
					 + param_escape(getActiveArticleId());
		new Ajax.Request("backend.php",	{
			parameters: query,
			onComplete: function(transport) {
				var ti = JSON.parse(transport.responseText);
				if (ti) {	
					console.log("addView: article viewed");
				}
			}
		});	

	}

    return ret;
  }

  window.cdmExpandArticle = __cdmExpandArticle;
}) (cdmExpandArticle);
