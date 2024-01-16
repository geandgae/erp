/**
 * ============================================================================
 * Nsf request plugin
 *
 * @requires jQuery v1.2.3 or later
 *
 * @author		jissfa
 * @version		1.0
 * @since		1.0
 *
 * History
 * 1.0	2009. 1. 20.	jissfa	Initial Version
 * ============================================================================
 */ 
var NsfRequest = {
	isLoaded: true,
	http: { 
		doPost: function(uri, param, target) {
			NsfRequest.http.call("POST", uri, param, target);
		}, 
		call: function(type, uri, param, target) {  
			jQuery("#form-request").attr("action", "");
			jQuery("#form-request").attr("method", "");
			jQuery("#form-request").attr("target", "");
			jQuery("#form-request").empty();

			jQuery("#form-request").attr("action", uri);
			jQuery("#form-request").attr("method", type);

			if (null == target || "" == target)
				jQuery("#form-request").attr("target", "frame-request");
			else
				jQuery("#form-request").attr("target", target);

			if (null != param) {
				for (i=0; i<param.length; i++) {
					var input = "<input"
							  + " type=\"hidden\""
							  + " name=\"" + param[i].name + "\""
							  //+ " value=\"" + param[i].value + "\""
							  + "/>";
					jQuery("#form-request").append(input);
					jQuery("#form-request input:last-child").val(param[i].value);
				}
			} 
		}
	}, 
}

//]]>