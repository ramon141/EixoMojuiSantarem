using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Player : MonoBehaviour
{

    Dictionary<string, int> ENEMIES_POINTS = new Dictionary<string, int>();

    private Animator aniPlayer;

    private Rigidbody2D rbPlayer;

    private SpriteRenderer sprite;

    private float speed = 5;
    private float speedJump = 270;

    private UIScoreController uiScoreController;
    private UIPlateController uiPlateController;
    private UIKeyController uiKeyController;

    private const int TOTAL_JUMP = 10;
    public int quantJump = 0;

    // Start is called before the first frame update
    void Start()
    {
        fillEnemiesPoints();

        uiPlateController = UIPlateController.uipc;
        uiScoreController = UIScoreController.uisc;
        uiKeyController = UIKeyController.uikc;

        rbPlayer = GetComponent<Rigidbody2D>();
        sprite = GetComponent<SpriteRenderer>();
        aniPlayer = GetComponent<Animator>();
    }

    public void fillEnemiesPoints()
    {
        ENEMIES_POINTS.Add("Frog", 10);
    }

    // Update is called once per frame
    void Update()
    {
        Jump();
        if (!hasLive())
            PlayerUtils.killPlayer(this, gameObject);

    }

    public void ReloadScene()
    {
        Scene scene = SceneManager.GetActiveScene();
        SceneManager.LoadScene(scene.name);
    }

    bool hasLive()
    {
        return transform.position.y > -4;
    }

    private void FixedUpdate()
    {
        MovePlayer();
    }

    float GetHorizontalValue()
    {
        float horizontalMovement = Input.GetAxisRaw("Horizontal");
        return horizontalMovement * speed;
    }

    void Jump()
    {
        if (Input.GetButtonDown("Jump") && quantJump < TOTAL_JUMP)
        {
            rbPlayer.velocity = Vector2.zero;
            rbPlayer.AddForce(new Vector2(0, speedJump), ForceMode2D.Impulse);
            aniPlayer.SetBool("Jump", true);
            quantJump++;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.name == "Ground")
        {
            quantJump = 0;
            aniPlayer.SetBool("Jump", false);
        }
    }

    private void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.gameObject.layer == LayerMask.NameToLayer("Enemy"))
        {
            rbPlayer.velocity = Vector2.zero;
            rbPlayer.AddForce(new Vector2(0, speedJump), ForceMode2D.Impulse);
            collider.gameObject.GetComponent<SpriteRenderer>().flipY = true;
            collider.gameObject.GetComponent<Enemy>().enabled = false;
            collider.gameObject.GetComponent<BoxCollider2D>().enabled = false;
            Destroy(collider.gameObject, 2f);

            uiScoreController.addScore(ENEMIES_POINTS[collider.gameObject.tag]);

        }
        else if (collider.gameObject.tag == "Plate")
        {
            uiPlateController.onEnterInPlate(collider.gameObject);
        }
        else if (collider.gameObject.tag == "Key")
        {
            uiKeyController.addKey("gate_finish");

            //Destroy key
            collider.gameObject.GetComponent<BoxCollider2D>().enabled = false;
            Destroy(collider.gameObject, 0f);
        }
    }

    private void OnTriggerExit2D(Collider2D collider)
    {
        if (collider.gameObject.tag == "Plate")
        {
            uiPlateController.onExidInPlate(collider.gameObject);
        }
    }

    void MovePlayer()
    {
        float horizontalMovement = GetHorizontalValue();

        rbPlayer.velocity = new Vector2(horizontalMovement, rbPlayer.velocity.y);

        if (horizontalMovement > 0)
        {
            aniPlayer.SetBool("Walk", true);
            sprite.flipX = false;
        }
        else if (horizontalMovement < 0)
        {
            aniPlayer.SetBool("Walk", true);
            sprite.flipX = true;
        }
        else
        {
            aniPlayer.SetBool("Walk", false);
        }
    }
}
