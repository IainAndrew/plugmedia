<?php
  function spamcheck($field){
        //Sanitize e-mail address
        $field = filter_var($field, FILTER_SANITIZE_EMAIL);
        //Validate e-mail address
        if(filter_var($field_var($field, FILTER_VALIDATE_EMAIL))){
            return TRUE;
        }
        else{
            return FALSE;
        }
    }    
    //Display form
    if(!isset($_POST["submit"])){
    }
    else{ //The user has submiited the form
        //Check if the email address is is filled in
        if(isset($_POST["email"])){
            //Check if the email address is valid
            $mailcheck = spamcheck($_POST["email"]);
            if($mailcheck==FALSE){
                echo "Please enter a valid email address";
            }
            else{
                $email = $_POST["email"]; //Sender
                $message = $_POST["message"];
                //Wrap message for php
                $message = wordwrap($message, 70);
                //Send mail
                mail("iainbruceandrew@gmail.com",$message,"From: $email\n");
                echo "Thanks for contacting us";
            }
        }
    }    
?>