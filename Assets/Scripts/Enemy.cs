using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Enemy : MonoBehaviour
{
    public float speed;
    private float speedJump = 5;

    public bool groundRight = true;
    public bool groundLeft = true;

    public Transform groundCheckRight;
    public Transform groundCheckLeft;

    private Rigidbody2D rbEnemy;
    private SpriteRenderer sprite;
    public LayerMask groundLayer;

    public bool isSkipable = false;

    public bool isJumping = false;

    // Start is called before the first frame update
    void Start()
    {
        sprite = GetComponent<SpriteRenderer>();
        rbEnemy = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        if (!isJumping)
        {
            transform.Translate(Vector2.right * speed * Time.deltaTime);

            groundRight = Physics2D.Linecast(groundCheckRight.position, transform.position, groundLayer);
            groundLeft = Physics2D.Linecast(groundCheckLeft.position, transform.position, groundLayer);

            if (groundRight == false || groundLeft == false)
            {
                speed *= -1;
            }
        }

        jump();
        flipIfNeed(speed);
    }

    void flipIfNeed(float speed)
    {
        Vector3 scale = transform.localScale;
        sprite.flipX = speed > 0;
    }

    void jump()
    {
        if (isSkipable && !isJumping)
        {
            float random = Random.Range(1f, 101f);

            if (random > 99.9)
            {
                rbEnemy.velocity = Vector2.zero;
                rbEnemy.AddForce(new Vector2(0, speedJump), ForceMode2D.Impulse);
                isJumping = true;
            }
        }
    }

    public void ReloadScene()
    {
        Scene scene = SceneManager.GetActiveScene();
        SceneManager.LoadScene(scene.name);
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.name == "Ground")
        {
            isJumping = false;
        }

        if (collision.gameObject.tag == "Player")
        {
            PlayerUtils.killPlayer(this, collision.gameObject);
        }
    }
}
