/********** T o Start The Laravel Process Over Https */
//  symfony serve --allow-all-ip --port=8000 --p12=./ssl/mycert.p12
// abood users/1/62Ap2KDYdiSFnQfiv0DcZVFyk9PAnbIMz3PpBSte.png
// hamza users/4/KDn4L2fo4JSN6Kvv1Q2a4T95BYtYXoqlNAL0whpD.jpg
// Ayham users/11/5aIM5BFDMucJIulo3C11NDxnBOFL9gTsAndwHljY.jpg
/********** To Start The Laralve Project Over Https  */
// php artisan serve --host 192.168.1.109
/************** YetTo Fix *************/
// Fix The UpdatePost Form Full Post View When DeletingAn diMage From The Full View There is NoWay ToSubmit The Post Until You Close The PostFull View ThenSubmit The Post From The updatePostForm
// Prevent The user To Post or Update The Post With The Same attachment More Than One Time In The Post
// fix the error Returned When Downloading An Attachment
// why the pdf File Come Tow Times When Selected As Attachment
// Put The Focus On The TextInput on The CreatePostForm And THe UpdatePostForm
// Set A Loading When Sending Invitation To Group
//Some Request Is Not Working
// Make Test For All The Request in The Application
// fix the Design of the post card
// fix the design of the Create Post Form When Adding Images
/************** TOday *************/
// The Read When Opining A Chat The Al lTHe Messages Get Marked As Is_read = true
/************** Working On *************/

// in laravel in the post comment migration  public function up(): void
// {
//   Schema::create('post_comments', function (Blueprint $table) {
//     $table->id();
//     $table->foreignId('post_id')->constrained('posts')->onDelete('cascade');
//     $table->text('comment');
//     $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
//     $table->bigInteger('parent_id')->unsigned()->nullable();
//     $table->timestamps();
//   });
// } the comment it self it is for a post ad it can be for a anouther comment as a sub comment when i want  to delete the relation prevent me to deletewhat i can do for that  and here is the errro message i am having from the backend  "SQLSTATE[23000]: Integrity constraint violation: 1451 Cannot delete or update a parent row: a foreign key constraint fails (`social_media`.`post_comments_reactions`, CONSTRAINT `post_comments_reactions_post_comments_id_foreign` FOREIGN KEY (`post_comments_id`) REFERENCES `post_comments` (`id`)) (Connection: mysql, SQL: delete from `post_comments` where `id` = 1)"

/************** Done *************/
// Implement Ending CAlls
// Fixing The Design Of The Answer Form For The Video Call Form
// When New Message Comes The UnReadCount Get Still Count Even If The Chat Is Open
// THe Text Area In The Chat Form Broken In The Small Devices
// Fixing The Design Of The Call Form
// when creating a group you have to reload the b=page or re get the groups
// When Updating The GroupName Adn The About The Data In The View Don`t Get Updated
// Add Function To Delete A group
// When Adding New Users To The ChatGroup The Data In THe Chat CArd Get Saved Wrong
// when adding New USers To Chat Group Check if the users already exist in the chat
// Add  A Delete Section I  The Setting page In The View Of THe Group
// ADd About Section In The View For The group
// Update The About Section in The View Of The Group To Be THe Setting
// Adding Jobs For Heavy Work
// send The Change Role For USers And Kicking Out The Users On The Private Channels For The users
// create Action In The Chat For Changing The Chat Name Or Adding users Or Kicking Out users
// set ShowChatInfo Form To False When The View Changes
// Creating Form To Change The Permeation Of The user In The Chat Group
//add user To Chat   backend Done
// kick User Form Group backend Done
// Set Chat Group Member As Admin backend Done
// Set Chat Group Member As User backend Done
// delete All The Attachment Of The Group When Deleting The ChatGroup
// ADding Events For creating A Chats
// ADding Event For Deleting A Chat
// ADding Events For Updating The Chat
// ALlowing The Change The Data Of THe Group For Admins Only
// fix the design of The Message Attachments
// send notifications For The users When They Are Added Or Removed From The Group
// Adding Permeations For The Group
// show The Admin In The Chats Members
// SHowing The Attachments For The Chat In The Chat Info
// make sure when sending a large file to show the Errors message
// Add Validation When Sending A large File To Check The File size and show the correct error MEssage From The Backend
// Implementing The Block  And Un Block For User
// Implementing The Leave And Group
// Implementing The  Mute For User And Group
// Implementing Deleting The Group
// Add THe Download Button To The Profile Image Full View
// show thee error message in the login pages
// Fix The Add Friend  Button In The Profile View
// update All The Pages And The Requests To Show The Success Message And Error Messages
// create Post  [d]
// Update pOst  [d]
// Delete Post  [d]
// Ai Post  [d]
// post Reactions [d]
// Post Comment [d]
// COmment Reaction [d]
// Update Comment [d]
// Delete Comment  [d]
//Download Attachment [d]
//  Home  [d]
// Group View [d]
// profile View [d]
// My Profile View [d]
// Fix THe message When Sent To Group To Not Show The Check
// update The Notification To Take A Generic Link To Store
// fix the design in the chats bar
// Update The Authenticated Layout for The Public View
// make the message Disappear when Reloading
// Format The ChatCard Data Correctly
// Get The ChatCard Data From The Chat  Messages Not From The Chat Fields
// FIx The Z-Index in All OverLays
// Get The LastMessage From The Chat It Self Not From The LastMessageField
// fix the Notification To Take The Image From The data base And Not To Save The Image In The Notifications Table
// add try catch toAll New Api End Points
// Paginate The Data Coming From The Backend
// send the data from a custom request from The frontend not with the page loading
// Fix The Design In The Post CArd For Small Screens
// Add The loading For All Needed Pages
// Make Any Button On The Navbar Close The Other menus
// fix the chat Card
// Fix The Post Card On The Mobile Phone
// Fix THe Profile Design
// make to inviteUserForm returning The Ordered User as A User Card
// MAke The New NotificationsBar And the Group Bar Responsive
// Make The Followers bar THe Same As THe Groups And Notifications Bars
// Fix The Design In The COmment Section
// fix the design Of TheNotificationBar And THe Notifications Card
// Fixing THe Fll Post card
// Fix The Design Of The PublicPostView
// Fix The Comment Card
// Fix The Error Page Design
// implement The Error Messages In The Create Post From And The update Post Form
// Create Context Provider To The Application
// Prevent The user To Post An Empty Post
//Remove Image And SetImages
// Make Sure That All Files Take The Same Treatment
// Make TheFile Attachment To Have An Appearance In The ImageFull View
// remover the remove button and the index span from the Attachment Card In The CreatePostForm And UpdatePostForm When There Is Moe Than Tow Attachments
// fix the bug that when removing an unSupported File To Remove It`s Error With it
// create A Function To Check if The User Is A Admin In Th Group
// when Deleting A Post the Menu Stay Open
// fix the Design In The Profile Page and The PageProfile Page
// make All The Requests Py The useForm Hook
// Make All Responses From The Backend With THe Redirect And Set The Success Message Correctly
// edit the profile controller to show the right view for if the user if the user is the same user he is authenticated or the visit view if he is not

//Notifications // 1000
// ImageFull VIew // 800
// FullPostCard //  600
// PostPreview // 600

//Delete Post Must Return THe Group Page Instate Of The PublicPotView

/**
 *
 *
 * "https://192.168.1.109:3000",
        "http://192.168.1.109:3000",
        "https://192.168.1.109:8000",
        "http://192.168.1.109:8000",
        "ws://192.168.1.109:6001",
        "ws://192.168.1.109:6001",

        "wss://192.168.1.109:443",
        "wss://192.168.1.109:444",
        "wss://192.168.1.109:3000",
        "wss://192.168.1.109:6001",

        "wss://myproject.tes:443",
        "https://myproject.test:444",
        "https://myproject.test:3000",
        "https://myproject.test:6001",

        "https://127.0.0.1:443",
        "https://127.0.0.1:444",
        "https://127.0.0.1:3000",
        "https://127.0.0.1:6001",

        "wss://127.0.0.1:443",
        "wss://127.0.0.1:444",
        "wss://127.0.0.1:6001",
        "wss://127.0.0.1:3000",

        "wss://myproject.test:443",
        "wss://myproject.test:444",
        "wss://myproject.test:3000",
        "wss://myproject.test:6001",
 */
if (true) {
  console.log("ABood");
} else {
  console.log("amjad");
}
x == 1 ? console.log("ABood") : console.log("amjad");
